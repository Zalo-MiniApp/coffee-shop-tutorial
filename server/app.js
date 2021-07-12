const express = require('express')
const request = require('request');
const { insertUser, listUsers } = require('./db');
const app = express()
const port = process.env.PORT || 5000

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('>>> Highland Coffee Server <<<')
})

app.post('/login', (req, res) => {
  const access_token = req.body.access_token
  const url = `https://graph.zalo.me/v2.0/me?access_token=${access_token}&fields=id,birthday,name,gender,picture`
  request(url, (err, _, body) => {
    if (err) return res.send(err)
    res.send(body)
    insertUser(body)
  });
})

app.get('/users', async (req, res) => {
  const users = await listUsers()
  res.send(users)
})

app.listen(port, () => {
  console.log(`Highland Coffee server is listening at http://localhost:${port}`)
})