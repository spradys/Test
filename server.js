const express = require('express');
const app = express();
app.use(express.text()); // Для читання тексту у POST-запитах

let tasks = []; // Масив завдань

// Повернення списку завдань
app.get('/', (req, res) => {
    if (tasks.length === 0) {
        res.send('No tasks.');
    } else {
        res.send(tasks.map((task, index) => `${index + 1}. ${task}`).join('\n'));
    }
});

// Додавання завдання
app.post('/add', (req, res) => {
    const task = req.body;
    if (task) {
        tasks.push(task);
        res.send('Task added.');
    } else {
        res.status(400).send('Task cannot be empty.');
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
