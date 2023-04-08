const { Pool } = require("pg");
const format = require("pg-format");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "ivan2102",
    database: "joyas",
    port: 5432,
    allowExitOnIdle: true
});

const getDate = async () => {
    const query = "SELECT NOW()";
    const {rows} = await pool.query(query);
    console.log(rows)
    return rows
}



const getJoyas = async (limits = 3, order_by = "id_ASC") => {
    const[campo, direccion] = order_by.split('_')
    const inventario = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s", campo, direccion, limits)
    const queryCount = format('SELECT count(id) as "total" FROM inventario')
    const queryStock = format('SELECT sum(stock) as "totalStock" FROM inventario')
    const {rows:inv} = await pool.query(inventario)
    const {rows:count} = await pool.query(queryCount)
    const {rows:sto} = await pool.query(queryStock)
    const pages = count[0].total/limits
    console.log(count[0].total)
    return ({'TotalJoyas':count[0].total,'TotalInventario':sto[0].totalStock,'pages':pages,results:{inv}})
}

const getFiltro = async ({pmax=20000, pmin = 20000, categoria = 'collar', metal = 'oro'})=> {
    const precioMax = format("SELECT * FROM inventario WHERE precio > %s", pmax)
    const precioMin = format("SELECT * FROM inventario WHERE precio < %s", pmin)
    const cat = format("SELECT * FROM inventario WHERE categoria = '%s'",categoria)
    const mat = format("SELECT * FROM inventario WHERE metal = '%s'",metal)
    const {rows:pm} = await pool.query(precioMax)
    const {rows:pi} = await pool.query(precioMin)
    const {rows:c} = await pool.query(cat)
    const {rows:m} = await pool.query(mat)
    return {"Precio_mayor_a_20000":{pm},"Precio_menor_a_20000":{pi},"Categoria_Collar":{c},"Material_Oro":{m}}
}

module.exports = {getDate, getJoyas, getFiltro}