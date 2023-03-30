import { Router } from 'express';
import fs from 'fs';

const reg = /\..*/gm;

const css = Router()
for (const file of fs.readdirSync(`${process.cwd()}/views/css`)) {
  css.get(`${file.replaceAll(reg, '')}`, (req, res) => {
    res.sendFile(`${process.cwd()}/views/css`);
  })
}

export default css;