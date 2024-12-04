import express from "express";
import cors from "cors";
import mapaRouter from "./router/mapaRouter.js";
const app = express();
let porta = 3000;
app.use(cors());
app.use('/consultar', mapaRouter)

app.listen(porta, ()=>{
    console.log('Sucesso');
})