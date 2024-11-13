/**
 * Removes all special charactes and trailing zeros from a given string.
 */
export const removeSpecialCharacters = (input) => {
    // return input.replace(/[^a-zA-Z0-9.]|\.(?=0+$)/g, '');
    if(typeof input != 'string'){
        throw new TypeError('Amount entered must be a string');
    }

    return input.replace(/[$,]/g, '').split('.')[0];
};