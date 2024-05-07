/**
 * Extracts the first name and last name from an email address.
 * @param {string} email - The email address.
 * @returns {{ name: string, lastName: string }} An object containing the extracted first name and last name.
 */
export function extractNameFromEmail(email: string) {
    const parts = email.split('@')[0].split('.');
    const name = capitalizeFirstLetter(parts[0].substring(0, 8));
    const lastName = capitalizeFirstLetter(parts[0].substring(8)); 
    return { name , lastName };
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} The input string with the first letter capitalized.
 */
function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Shortens a wallet address by displaying only the first and last few characters.
 * @param {string} address - The wallet address.
 * @param {number} [length=6] - The number of characters to display from the start and end of the address.
 * @returns {string} The shortened wallet address.
 */
export const shortenWalletAddress = (address: string, length = 6) => {
    if (address.length <= length * 2) return address;
    const start = address.substring(0, length);
    const end = address.substring(address.length - length);
    return `${start}...${end}`;
};
