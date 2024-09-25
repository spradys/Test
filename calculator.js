const rl = require('readline-sync');
let continueCalculation = true;

while (continueCalculation) {
    const firstNumber = rl.question('Enter the first number? ');
    const secondNumber = rl.question('Enter the second number? ');
    const operation = rl.question('Enter the operation? ');

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let result;

    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
    }

    console.log(`Result: ${result}`);

    const answer = rl.question('Do you want to perform another operation? (yes/no): ').toLowerCase();
    if (answer !== 'yes' ) {
        continueCalculation = false;
        console.log('Thank you for using the calculator!');
    }
}
