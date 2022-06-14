const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { nuevoCurso, cursos, editarCurso, eliminarCurso } = require('./consultas')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// LLamada al html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Escribe datos 
app.post('/curso', async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion)
    res.send(respuesta)
})

// Ruta a tabla
app.get('/cursos', async (req, res) => {
    const respuesta = await cursos()
    res.send(respuesta)
})

app.put('/curso/:id', async (req, res) => {
    const { id } = req.params
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body
    const respuesta = await editarCurso(id, nombre, nivelTecnico, fechaInicio, duracion)
    res.send(respuesta)
})

app.delete('/curso/:id', async (req, res) => {
    const { id } = req.params
    const respuesta = await eliminarCurso(id)
    respuesta > 0
        ? res.send(`El curso con el id ${id} fue eliminado con éxito`)
        : res.send("No existe un curso registrado con ese id")
})


app.listen(3000, () => console.log('Server on http://localhost:3000'))