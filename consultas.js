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

const obtenerJoyas = async ({ limits = 5}) => {
    const[campo, direccion] = Order_by.split('_')
    const consulta = format("SELECT * FROM inventario ORDER_BY %s %s LIMIT %s", campo, direccion, limits)

    const {rows: inventario} = await pool.query(consulta)
    console.log(rows)
    return inventario
}

module.exports = {getDate, obtenerJoyas}