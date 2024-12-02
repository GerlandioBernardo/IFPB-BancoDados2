import express from "express";
import cors from "cors";
import 'dotenv/config'
import pg from "pg";
const {Pool} = pg;
const app = express();
let porta = 3000;
app.use(cors());
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_BD,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
})
app.get('/consultar', async (req, res)=> {
    const {estado, municipio} = req.query;
    try{
        const respostaEstado = await pool.query(
            'select getViewBoxEstado($1)',
            [estado]
        )
        const geomEstado = await pool.query(
            'SELECT ST_AsSVG(geom) FROM estado WHERE nome ILIKE($1)',
            [estado]
        )
        const geomMunicipio = await pool.query(
            'SELECT ST_AsSVG(geom)  FROM municipios WHERE nome ILIKE($1)',
            [municipio]
        )
        res.json({
            estado: respostaEstado.rows,
            respostaGeomEstado: geomEstado.rows,
            respostaGeomMunicipio: geomMunicipio.rows
        })
    }
    catch(error){
        console.log(error);
    }


})
app.listen(porta, ()=>{
    console.log('Sucesso');
})