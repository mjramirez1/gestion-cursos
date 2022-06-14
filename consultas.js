const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    database: 'cursos_db',
    port: 5432,
})

async function nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion) {
    try {
        const sqlQuery = {
            text: 'INSERT INTO cursos (nombre, nivel, fecha, duracion) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [nombre, nivelTecnico, fechaInicio, duracion]
        }
        const result = await pool.query(sqlQuery)
        return result.rows
    } catch (error) {
        return error
    }
}

async function cursos() {
    try {
        const sqlQuery = {
            text: "SELECT id, nombre, nivel, to_char(fecha, 'yyyy-mm-dd') AS fecha, duracion FROM cursos"
        }
        const result = await pool.query(sqlQuery)
        return result.rows
    } catch (error) {
        return error
    }
}

async function editarCurso(id, nombre, nivelTecnico, fechaInicio, duracion) {
    try {
        const sqlQuery = {
            text: 'UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *',
            values: [id, nombre, nivelTecnico, fechaInicio, duracion]
        }
        const result = await pool.query(sqlQuery)
        return result.rows
    } catch (error) {
        return error
    }
}

async function eliminarCurso(id) {
    try {
        const sqlQuery = {
            text: 'DELETE FROM cursos WHERE id = $1 RETURNING *',
            values: [id]
        }
        const result = await pool.query(sqlQuery)
        return result.rowCount
    } catch (error) {
        return error

    }
}

module.exports = {
    nuevoCurso,
    cursos,
    editarCurso,
    eliminarCurso
}