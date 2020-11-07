import express from 'express';
import './database/connection';

const app = express();
app.use(express.json());

app.post('/orphanages', (req, res) => {
  console.log(req.body);
  return res.send('TODO:');
});

app.listen(3333);