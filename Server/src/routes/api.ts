import express, { Router } from 'express';
import sql from "../DB/sql.js";
import CryptoJs from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { randomNumber, randomString, toNormalUser } from "../utils/utils.js";
import { User } from "../utils/types.js";
import bodyParser from 'body-parser';

const minSaltLen = 8;
const maxSaltLen = 30;

const api = Router()
api.use(express.static(`${process.cwd()}/views`));

api.use(bodyParser.json());

api.use((req, res, next) => {
  const ua = req.headers["user-agent"]
  console.log(ua);
  if (!ua) return res.status(404).send();
  const whitelisted_uas = ['expo', 'socialite']
  for (const wua of whitelisted_uas)
    if (ua.toLowerCase().includes(wua)) return next();

  return res.status(404).render('404');
});

function hashPassword(password: string, salt: string): string {
  return CryptoJs.SHA256(password + salt).toString()
}

api.get('/profile/:uid', (req, res) => { 
  const uid: string = req.params.uid;
  const user = sql.users(uid).getNormal();
  return res.send(user ? JSON.stringify(user) : 'error');
})

api.patch('/username/:uid/:username', (req, res) => {
  const username = req.params.username;
  const uid = req.params.uid;

  const user = sql.users().getByUsernmae(username);
  if (user) return res.send("exists");
  const r = sql.users(uid).setUsername(username);
  if (!r.changes) return res.send('error');
  return res.send(sql.users(uid).getNormal());
})

api.get('/login/:email/:password', (req, res) => {
  const email: string = req.params.email;
  const password: string = req.params.password;
  
  const user = sql.users().getByEmail(email);
  if (!user) return res.send('error');
  const hashed = hashPassword(password, user.salt);
  const validPassword = hashed === user.hashed
  return res.send(validPassword ? toNormalUser(user) : 'error')
});

api.post('/register/:email/:password', (req, res) => {
  const email: string = req.params.email;
  const password: string = req.params.password;

  const uid = uuidv4();
  const salt = randomString(randomNumber(minSaltLen, maxSaltLen));
  const hashed = hashPassword(password, salt);
  try {
    sql.users(uid).create(email, hashed, salt);

    res.send(<User>{ email: email, username: undefined, uid: uid });
  } catch (err) { res.send("exists") }
});

api.patch('/password/:uid/:password', (req, res) => {
  const uid = req.params.uid;
  const password = req.params.password;
  const salt = randomString(randomNumber(minSaltLen, maxSaltLen));
  const hashed = hashPassword(password, salt);
  const r = sql.users(uid).updatePassword(hashed, salt);
  if (!r.changes) return res.send('error');
  return res.send('success');
});

api.patch('/email/:uid/:email', (req, res) => {
  const uid = req.params.uid;
  const email = req.params.email;
  const r = sql.users(uid).updateEmail(email);
  if (!r.changes) return res.send('error');
  return res.send('success');
});

api.post('/verify/:uid', (req, res) => {
  const uid: string = req.params.uid;
  const user = sql.users(uid).getNormal();
  if (!user) return res.send('error');
  return res.send('success');
});

api.use((req, res) => {
  res.status(404).render('404');
});


export default api;