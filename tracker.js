const readlineSync = require('readline-sync');

const transactions = []; // Масив для зберігання даних

function addTransaction(type) {
    const amount = parseFloat(readlineSync.question(`Amount for ${type === 'income' ? 'income' : 'expense'}: `));
    if (isNaN(amount) || amount <= 0) return console.log('Invalid amount.');

    const category = readlineSync.question('Category: ');
    transactions.push({ type, amount, category, date: new Date() });
    console.log(`${type === 'income' ? 'Income' : 'Expense'} added.`);
}

function viewTransactions(filterFn = () => true) {
    const filtered = transactions.filter(filterFn);
    if (!filtered.length) return console.log('No transactions found.');
    filtered.forEach((t, i) => 
        console.log(`${i + 1}. ${t.type === 'income' ? 'Income' : 'Expense'}: ${t.amount} UAH, Category: ${t.category}, Date: ${t.date}`)
    );
}

function getDateInput(prompt) {
    const input = readlineSync.question(`${prompt} (YYYY-MM-DD): `);
    const date = new Date(input);
    return isNaN(date.getTime()) ? null : date;
}

function viewBalanceAtDate() {
    const targetDate = getDateInput('Date');
    if (!targetDate) return console.log('Invalid date format.');

    const balance = transactions.reduce((acc, t) => 
        t.date <= targetDate ? acc + (t.type === 'income' ? t.amount : -t.amount) : acc, 0);
    console.log(`Balance on ${targetDate.toDateString()}: ${balance} UAH`);
}

function main() {
    const options = {
        '1': () => addTransaction('income'),
        '2': () => addTransaction('expense'),
        '3': () => viewTransactions(),
        '4': () => viewTransactions(t => t.category.toLowerCase() === readlineSync.question('Category: ').toLowerCase()),
        '5': () => {
            const start = getDateInput('Start date');
            const end = getDateInput('End date');
            if (start && end) viewTransactions(t => t.date >= start && t.date <= end);
        },
        '6': viewBalanceAtDate
    };

    while (true) {
        console.log('\n1. Add income\n2. Add expense\n3. View all transactions\n4. View expenses by category\n5. View transactions by date range\n6. View balance on a specific date\n7. Exit');
        const choice = readlineSync.question('Select an option: ');
        if (choice === '7') break;
        options[choice] ? options[choice]() : console.log('Invalid option.');
    }
}

main();
