import express from "express";
import cors from "cors";
import fs from 'fs';

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions))

const files = fs.readdirSync(`${process.cwd()}/dist/routes`);

(async () => {
  for (const file of files) {
    const { default: route } = await import(`${process.cwd()}/dist/routes/${file}`);
    app.use(`/${file.replace('.js', '')}`, route);
  }
})();

const port = 3030;
app.listen(port, () => console.log(`Server running on port ${port}`));