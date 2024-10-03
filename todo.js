const readlineSync = require('readline-sync');

let tasks = []; // Тепер смасив

function showMenu() {
    console.log(`
1. Add a task
2. View tasks
3. Delete a task
4. Exit
    `);
}

function addTask() {
    const task = readlineSync.question('Enter task: ');
    tasks.push(task); // Додає задачу
    console.log('Task added.');
}

function viewTasks() {
    if (tasks.length === 0) {
        console.log('No tasks.');
    } else {
        console.log('Your tasks:');
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`); // Вивід задач
        });
    }
}

function deleteTask() {
    if (tasks.length === 0) {
        console.log('No tasks to delete.');
    } else {
        viewTasks();
        const taskNumber = readlineSync.question('Enter the number of the task to delete: ');
        const index = parseInt(taskNumber) - 1;

        if (index >= 0 && index < tasks.length) {
            const deletedTask = tasks.splice(index, 1); // Видаляє задачу
            console.log(`Deleted: ${deletedTask}`);
        } else {
            console.log('Invalid task number.');
        }
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
            viewTasks();
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
