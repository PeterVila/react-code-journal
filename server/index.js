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

app.post('/api/entries/', (req, res, next) => {
  console.log(req.body);
  const {
    title,
    link,
    image,
    description,
    technologies
  } = req.body;
  if (!title || !link || !image || !description || !technologies) {
    throw new ClientError(400, 'postId and content');
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
