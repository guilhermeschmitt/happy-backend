const { response } = require('express');
const express = require('express');

const app = express();

app.get('/test', (req, res) => res.send("Hello world!"));

app.listen(3333);