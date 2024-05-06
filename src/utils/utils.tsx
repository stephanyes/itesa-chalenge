export function extractNameFromEmail(email: string) {
    const parts = email.split('@')[0].split('.');
    const name = capitalizeFirstLetter(parts[0].substring(0, 8)); // Extract "Stephano" (8 characters)
    const lastName = capitalizeFirstLetter(parts[0].substring(8)); 
    return { name , lastName };
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}