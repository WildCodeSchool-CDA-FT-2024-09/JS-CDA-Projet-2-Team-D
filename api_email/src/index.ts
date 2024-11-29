import * as dotenv from "dotenv";
import express from "express";
const app = express();

dotenv.config();
const { PORT } = process.env;

app.get("/email", (req, res) => {
  res.send("Hello Email!");
});

app.listen(PORT, () => {
  console.info(`🚀 API email server ready at http://localhost:${PORT}`);
});
