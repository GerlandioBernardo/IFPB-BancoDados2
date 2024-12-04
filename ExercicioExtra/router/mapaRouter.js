import express from "express";
import {consultarDados} from "../controller/mapaController.js";
const mapaRouter = express.Router();

mapaRouter.get('/', consultarDados);
 
export default mapaRouter;