import express from 'express';
const port = 8080

const app = express();

app.get('/usuarios', (req, res) => {
  res.json({ mensagem: `Somos as poderosas` });
});

app.listen(port,()=>{
  console.log(`Server iniciado na porta ${port}\nLink: https://refactored-palm-tree-6j4xv7wpxp7h5gwr-8080.app.github.dev/`)
});