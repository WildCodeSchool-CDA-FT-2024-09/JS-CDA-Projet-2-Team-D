import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.info(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
