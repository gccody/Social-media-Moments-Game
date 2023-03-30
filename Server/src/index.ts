import express from "express";
import SQL from "./DB/sql.js";
import CryptoJs from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { randomNumber, randomString, toNormalUser } from "./utils/utils.js";
import cors from "cors";
import { User } from "./utils/types.js";

const minSaltLen = 8;
const maxSaltLen = 30;

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions))
const sql = new SQL();

app.use((req, res, next) => {
  const ua = req.headers["user-agent"]
  if (!ua) return res.status(404).send();
  const whitelisted_uas = ['expo', 'moments']
  for (const wua in whitelisted_uas) if (ua.toLowerCase().includes(wua)) next();
  return res.status(404).send();
})

function hashPassword(password: string, salt: string): string {
  return CryptoJs.SHA256(password + salt).toString()
}

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/profile/:userid', (req, res) => {
  const userid = req.params.userid;
  const user = sql.users(userid).getNormal();
  return res.send(user ? JSON.stringify(user) : user);
})

app.patch('/username/:uid/:username', (req, res) => {
  const username = req.params.username;
  const uid = req.params.uid;

  const user = sql.users().getByUsernmae(username);
  if (user) return res.send("exists");
  const r = sql.users(uid).setUsername(username);
  if (!r.changes) return res.send('error');
  return res.send(sql.users(uid).getNormal());
})

app.get('/login/:email/:password', (req, res) => {
  console.log(req.headers);
  
  const email = req.params.email;
  const password = req.params.password;
  
  const user = sql.users().getByEmail(email);
  if (!user) return res.send(undefined);
  const hashed = hashPassword(password, user.salt);
  const validPassword = hashed === user.hashed
  return res.send(validPassword ? toNormalUser(user) : undefined)
});

app.post('/register/:email/:password', (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  
  const uid = uuidv4();
  const salt = randomString(randomNumber(minSaltLen, maxSaltLen));
  const hashed = hashPassword(password, salt);
  try {
    sql.users(uid).create(email, hashed, salt);
    
    res.send(<User>{ email: email, username: undefined, uid: uid });
  } catch(err) { res.send("exists") }
})

const port = 3030;
app.listen(port, () => console.log(`Local server running on port ${port}`));