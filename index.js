const express = require('express')
const {getDate, obtenerJoyas} = require('./consultas');
const app = express()
app.listen(3000, console.log('Server ON'))

// const {  } = require('./consultas')

app.use(express.json())

app.get('/joyas', async (req, res) => {
  try {
    const queryString = req.query
    const consulta = await obtenerJoyas(queryString)
  
  res.json(consulta)
}
catch (error) {
  console.log(error)
  res.status(500).send("Ups, algo salio mal")
  
}
})
app.get('/joyas/filtros', async (req, res) => {
  const queryString = req.query
  const joyas = await obtenerJoyasPorFiltros(queryString)
  res.json(joyas)

})

app.get('/date', async (req, res) => {
  const result = await getDate()
  res.json(result)

})