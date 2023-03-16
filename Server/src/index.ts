import express from "express";
import SQL from "./DB/sql.js";
import CryptoJs from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { randomNumber, randomString } from "./utils/utils.js";

const minSaltLen = 8;
const maxSaltLen = 30;

const app = express();
const sql = new SQL();

function hashPassword(password: string, salt: string): string {
  return CryptoJs.SHA256(password + salt).toString()
}

app.get('/login/:email/:password', (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const user = sql.users().get(email);
  if (!user) return res.send();
  const hashed = hashPassword(password, user.salt);
  return res.send(hashed === user.hashed ? user.uid : undefined)
});

app.post('/register/:email/:password', (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const uid = uuidv4();
  const salt = randomString(randomNumber(minSaltLen, maxSaltLen));
  const hashed = hashPassword(password, salt);
  try {
    sql.users(uid).create(email, hashed, salt);
    
    res.send(uid);
  } catch(err) { res.send("exists") }
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});