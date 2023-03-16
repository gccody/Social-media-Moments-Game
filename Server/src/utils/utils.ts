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

export {randomNumber, randomString};