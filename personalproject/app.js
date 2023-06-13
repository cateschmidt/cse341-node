const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
// const professionalRoutes = require('./routes/contacts');
const axios = require('axios');
const session = require('express-session');

const port = process.env.PORT || 8080;
const app = express();

app.use(session({secret: process.env.GITHUB_CLIENT_SECRET, resave:false, saveUninitialized:true}))

// redirect to github
app.get('/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`,
  );
});

// callback
app.get('/callback', (req, res) => {
  const {code} = req.query;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => {
      req.session.token = _res.data.access_token
      res.redirect('/api-docs')
    })

    .catch((err) => res.status(500).json({ err: err.message }));
});

// logout
app.get('/logout', (req, res) => {
  req.session.token = null;
  res.redirect('/api-docs')

});


app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
