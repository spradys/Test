const readlineSync = require('readline-sync');

let task = ''; // Зберігає одну задачу

function showMenu() {
    console.log(`
1. Add a task
2. View task
3. Delete task
4. Exit
    `);
}   

function addTask() {
    task = readlineSync.question('Enter task: ');
    console.log('Task added.'); //додає задачу
}

function viewTask() {
    if (task === '') {
        console.log('No task.');
    } else {
        console.log(`Your task: ${task}`); //перегляд задач
    }
}

function deleteTask() {
    if (task === '') {
        console.log('No task to delete.');
    } else {
        console.log(`Deleted: ${task}`);
        task = ''; // Видаляє задачу
    }
}

function main() {
    let exit = false;
    while (!exit) {
        showMenu();
        const choice = readlineSync.question('Choose: ');
        if (choice === '1') {
            addTask();
        } else if (choice === '2') {
            viewTask();
        } else if (choice === '3') {
            deleteTask();
        } else if (choice === '4') {
            exit = true;
        } else {
            console.log('Invalid choice.');
        }
    }
}

main();
