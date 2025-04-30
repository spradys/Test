
const express = require('express');
const { Pool } = require('pg');



const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password:  'qwe',
  database:  'nwe',
});
pool.connect()

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted', user: result.rows[0] });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});  

app.post('/users', async (req, res) => {
  const { name, notname } = req.body;
  if (!name || !notname) {
    return res.status(400).json({ error: 'name and notname are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO users (name, notname) VALUES ($1, $2) RETURNING *',
      [name, notname]
    );
    res.status(201).json({ message: 'User added', user: result.rows[0] });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, notname } = req.body;

  try {
    const oldUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (oldUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedName = name ? name : oldUser.rows[0].name;
    const updatedNotname = notname ? notname : oldUser.rows[0].notname;

    const result = await pool.query(
      'UPDATE users SET name = $1, notname = $2 WHERE id = $3 RETURNING *',
      [updatedName, updatedNotname, id]
    );

    res.json({ message: 'User updated', user: result.rows[0] });

  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});



app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
