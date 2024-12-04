import pool from "../database/postgre.js";

export async function consultarDados(req, res){
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
}