const readline = require('readline');

// інтерфейс
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Функція
function calculate(num1, operator, num2) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '%':
      return num1 % num2;
  }
}

// запуск калькулятора
function startCalculator() {
  rl.question('Введіть перше число: ', (input1) => {
    const num1 = parseFloat(input1); // Перетворення на число

    rl.question('Виберіть операцію (+, -, *, /, %): ', (operator) => {
      rl.question('Введіть друге число: ', (input2) => {
        const num2 = parseFloat(input2);

        const result = calculate(num1, operator, num2);
        console.log(`Результат: ${result}`);

        rl.question('Бажаєте виконати ще одну операцію? (так/ні): ', (answer) => {
          if (answer.toLowerCase() === 'так') {
            startCalculator();
          } else {
            console.log('Дякуємо за використання калькулятора!');
            rl.close(); // Закриваємо інтерфейс
          }
        });
      });
    });
  });
}

// Запуск калькулятора
startCalculator();
