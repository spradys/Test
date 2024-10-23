const readlineSync = require('readline-sync');

// Генерація
function generatePassword(length, characters) {
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

// Вибір символів
function getPasswordCharacters(choice) {
    const charSets = {
        '1': 'abcdefghijklmnopqrstuvwxyz', // Легкий
        '2': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', // Середній
        '3': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()', // Важкий
    };
    return charSets[choice] || charSets['1']; // За замовчуванням легкий рівень
}

// Основна функція
function main() {
    const choice = readlineSync.question('Choose the difficulty level (1-easy, 2-medium, 3-hard): ');
    const length = parseInt(readlineSync.question('Enter password length: '), 10);
    const characters = getPasswordCharacters(choice);
    console.log(`Your passwor: ${generatePassword(length, characters)}`);
}
main();
