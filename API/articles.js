const express = require('express');
const { Pool } = require('pg'); 

const app = express();
const PORT = 3000;

app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',      
  password: 'qwe',
  database: 'nwe',
});

// GET all articles
app.get('/articles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles');
    res.json(result.rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET one article by id
app.get('/articles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST - add article
app.post('/articles', async (req, res) => {
  const { one, two } = req.body;
  if (!one || !two) {
    return res.status(400).json({ error: 'one and two are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO articles (one, two) VALUES ($1, $2) RETURNING *',
      [one, two] 
    );
    res.status(201).json({ message: 'Article added', article: result.rows[0] }); 
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT - update article by id
app.put('/articles/:id', async (req, res) => {
  const { id } = req.params;
  const { one, two } = req.body;

  try {
    const oldArticles = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);

    if (oldArticles.rows.length === 0) { 
      return res.status(404).json({ error: 'Article not found' });
    }

    const updateOne = one ? one : oldArticles.rows[0].one;
    const updateTwo = two ? two : oldArticles.rows[0].two;

    const result = await pool.query(
      'UPDATE articles SET one = $1, two = $2 WHERE id = $3 RETURNING *', 
      [updateOne, updateTwo, id]
    );

    res.json({ message: 'Article updated', article: result.rows[0] });
  } catch (err) {
    console.error('DB error', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE - delete article by id
app.delete('/articles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]); 
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' }); 
    }

    res.json({ message: 'Article deleted', article: result.rows[0] });
  } catch (err) {
    console.error('DB error', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
