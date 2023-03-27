import { DBUser, User } from "./types";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "1234567890";
const SPECIAL = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const CHARS = LETTERS + LETTERS.toUpperCase() + NUMBERS + SPECIAL;

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min;
}

function randomString(len: number): string {
  let str = "";
  while (str.length < len) {
    str += CHARS.charAt(randomNumber(0, CHARS.length-1))
  }
  return str;
}

function toNormalUser(u: DBUser): User { return <User>{ email: u.email, uid: u.uid, username: u.username } }

export {randomNumber, randomString, toNormalUser};