const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startCalculator() {
  let continueCalculation = true; 

  // цикл 
  do {
    // Перше число
    rl.question('Введіть перше число: ', (firstNumber) => {
      // Друге число
      rl.question('Введіть друге число: ', (secondNumber) => {
        // Операція
        rl.question('Виберіть операцію (+, -, *, /): ', (operation) => {
          const num1 = parseFloat(firstNumber);
          const num2 = parseFloat(secondNumber);
          let result;

          // Операція
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
          }

          console.log(`Результат: ${result}`);

          // Запитуємо, чи хоче користувач продовжити
          rl.question('Бажаєте виконати ще одну операцію? (так/ні): ', (answer) => {
            if (answer.toLowerCase() !== 'так') {
              continueCalculation = false; // Завершуємо цикл, якщо відповідь "ні"
              console.log('Дякуємо за використання калькулятора!');
              rl.close(); // Закриваємо інтерфейс
            }
          });
        });
      });
    });
  } while (continueCalculation); 
}

startCalculator();
