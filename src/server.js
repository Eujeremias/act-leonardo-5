import express from 'express';
import entregasRoutes from "./routes/routes.js"

const port = 8080
const app = express();

app.use(express.json())

app.use("/api",entregasRoutes)

app.listen(port,()=>{
  console.log(`Server iniciado na porta ${port}`)
});