const express = require('express');
const app = express();
const port = 3001;


//Dependencies
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


//Handlers
const register = require('./Handler/register');
const sign = require('./Handler/sign');
const profile = require('./Handler/profile');
const image = require('./Handler/image');


//Database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'sanket',
      database : 'smart-brain'
    }
});


//Middle-wares
app.use(express.json());
app.use(cors());


//Servers
app.post('/signin', (req, res) => { sign.handleSignIn(req, res, db, bcrypt)});

app.post('/register',(req, res) =>{ register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => { image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => { image.handleApi(req, res)});


//Listening
app.listen(port, () => {
    console.log("app is runnig on "+port);
});