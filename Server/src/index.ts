import express from "express";
import SQL from "./DB/sql.js";
import CryptoJs from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { randomNumber, randomString, toNormalUser } from "./utils/utils.js";
import cors from "cors";
import { User } from "./utils/types.js";
import https from 'https';
// import promptSync from 'prompt-sync';

const minSaltLen = 8;
const maxSaltLen = 30;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions))
const sql = new SQL();

function hashPassword(password: string, salt: string): string {
  return CryptoJs.SHA256(password + salt).toString()
}

app.get('/', (req, res) => {
  console.log("Root")
  res.send('Hello World!');
})

app.get('/profile/:userid', (req, res) => {
  console.log("Profile")
  const userid = req.params.userid;

  const user = sql.users(userid).getNormal()
  if (!user) return res.status(404).send();
  return res.status(200).send(JSON.stringify(user, null, 4))
})

app.patch('/username/:uid/:username', (req, res) => {
  console.log("Update username")
  const username = req.params.username;
  const uid = req.params.uid;

  const user = sql.users().getByUsernmae(username)
  if (user) return res.status(400).send("exists");
  const r = sql.users(uid).setUsername(username);
  console.log(r);
  
  if (!r.changes) return res.status(400).send();
  return res.status(200).send();
})

app.get('/login/:email/:password', (req, res) => {
  console.log("Login")
  const email = req.params.email;
  const password = req.params.password;
  
  const user = sql.users().getByEmail(email);
  if (!user) return res.status(400).send();
  const hashed = hashPassword(password, user.salt);
  const validPassword = hashed === user.hashed
  return res.status(validPassword ? 200 : 400).send(validPassword ? toNormalUser(user) : undefined)
});

app.post('/register/:email/:password', (req, res) => {
  console.log("register")
  const email = req.params.email;
  const password = req.params.password;
  
  const uid = uuidv4();
  const salt = randomString(randomNumber(minSaltLen, maxSaltLen));
  const hashed = hashPassword(password, salt);
  try {
    sql.users(uid).create(email, hashed, salt);
    
    res.status(200).send(<User>{ email: email, username: undefined, uid: uid });
  } catch(err) { res.status(400).send("exists") }
})

const port = 3030;
https
.createServer(app)
.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
