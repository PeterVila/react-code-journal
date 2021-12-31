require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const app = express();

const pg = require('pg');
// only create ONE pool for your whole server
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
app.use(staticMiddleware);
const jsonMiddleware = express.json();
app.use(jsonMiddleware);
// Routes

app.get('/api/entries', (req, res, next) => {
  const sql = `
  select *
    from "entries"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/entries/:entryId', (req, res, next) => {
  const entryId = Number(req.params.entryId);
  const params = [entryId];
  if (!Number.isInteger(entryId) || entryId <= 0) {
    res.status(400).json({
      error: '"gradeId" must be a positive integer'
    });
    return;
  }
  const sql = `
  select *
    from "entries"
  where "entryId" = $1
  `;
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      if (!entry) {
        res.status(404).json({
          error: `cannot find todo with todoId ${entryId}`
        });
        return;
      }
      res.json(entry);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/entries/', (req, res, next) => {
  const {
    title,
    link,
    image,
    description,
    technologies
  } = req.body;
  if (!title || !link || !image || !description || !technologies) {
    throw new ClientError(400, 'All inputs should not be empty!');
  }
  const sql = `
    insert into "entries" ("title", "link", "image", "description", "technologies")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [title, link, image, description, technologies];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
