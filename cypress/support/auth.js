/// <reference types="cypress" />

// import authSettings from './authSettings.json';

// const { apiScopes, 
//         authority, 
//         clientId, 
//         clientSecret, 
//         password,
//         username,
//     } = authSettings;

const authority = Cypress.env("authority");
const clientId = Cypress.env("clientId");
const clientSecret = Cypress.env("clientSecret");
const password = Cypress.env("password");
const username = Cypress.env("username");
const scopes = Cypress.env("scopes");

const environment = "login.windows.net";

// Functions to build the required entities for authentication

const buildAccountEntity = (
    homeAccountId,
    realm,
    localAccountId,
    username,
    name
  ) => {
    return {
        authorityType: "MSSTS",
        // This value does not seem to get used, so we can leave it out.
        clientInfo: "",
        homeAccountId: homeAccountId,
        environment: environment,
        realm: realm,
        localAccountId: localAccountId,
        username: username,
        name: name,
    };
};
  
  const buildIdTokenEntity = (
    homeAccountId, 
    idToken, 
    realm
  ) => {
    return {
      credentialType: "IdToken",
      homeAccountId: homeAccountId,
      environment: environment,
      clientId: clientId,
      secret: idToken,
      realm: realm,
    };
};
  

const buildAccessTokenEntity = (
    homeAccountId,
    accessToken,
    expiresIn,
    extExpiresIn,
    realm,
    scopes
  ) => {
    const now = Math.floor(Date.now() / 1000);
    return {
      homeAccountId: homeAccountId,
      credentialType: "AccessToken",
      secret: accessToken,
      cachedAt: now.toString(),
      expiresOn: (now + expiresIn).toString(),
      extendedExpiresOn: (now + extExpiresIn).toString(),
      environment: environment,
      clientId: clientId,
      realm: realm,
      target: scopes.map((s) => s.toLowerCase()).join(" "),
      // Scopes _must_ be lowercase or the token won't be found
    };
  };
  
  const buildRefreshTokenEntity = (
    clientId,
    environment,
    homeAccountId,
    refreshToken
  ) => {
    return {
      clientId: clientId,
      credentialType: "RefreshToken",
      environment: environment,
      homeAccountId: homeAccountId,
      secret: refreshToken
    };
};


// Function to inject the tokens into localStorage for testing
const injectTokens = (tokenResponse) => {
    const idToken = decode(tokenResponse.id_token);
    const localAccountId = idToken.oid || idToken.sid;
    const realm = idToken.tid;
    const homeAccountId = '${localAccountId}.${realm}';
    const username = idToken.preferred_username;
    const name = idToken.name;

    const accountKey = '${homeAccountId}-${environment}-${realm}';
    const accountEntity = buildAccountEntity(
        homeAccountId, 
        realm, 
        localAccountId, 
        username, 
        name);
    
    const idTokenKey = `${homeAccountId}-${environment}-idtoken-${clientId}-${realm}-`;
    const idTokenEntity = buildIdTokenEntity(
        homeAccountId, 
        tokenResponse.id_token, 
        realm);

    const accessTokenKey = `${homeAccountId}-${environment}-accesstoken-${clientId}-${realm}-${apiScopes.join(" ")}`;
    const accessTokenEntity = buildAccessTokenEntity(
        homeAccountId,
        tokenResponse.access_token,
        tokenResponse.expires_in,
        tokenResponse.ext_expires_in,
        realm,
        apiScopes
    );

    const refreshTokenKey = `${homeAccountId}-${environment}-refreshtoken-${clientId}--`;
    const refreshTokenEntity = buildRefreshTokenEntity(
        clientId,
        environment,
        homeAccountId,
        tokenResponse.refresh_token
    );

    localStorage.setItem(accountKey, JSON.stringify(accountEntity));
    localStorage.setItem(idTokenKey, JSON.stringify(idTokenEntity));
    localStorage.setItem(accessTokenKey, JSON.stringify(accessTokenEntity));
    localStorage.setItem(refreshTokenKey, JSON.stringify(refreshTokenEntity));
}

export const login = () => {
    return cy.visit("/").request({
        url: authority + "/oauth2/v2.0/token",
        method : "POST",
        body: {
            grant_type: "password",
            client_id: clientId,
            client_secret: clientSecret,
            username: username,
            password: password,
            scope: ["openid profile"].concat(apiScopes).join(" "),
        },
        form: true
    }).then((response) => {
        injectTokens(response.body);
}).reload();
};
