const express = require('express');

const {matematicas} = require('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();



routerMatematicas.get('/', (request, response) => {
    response.send(JSON.stringify(matematicas));
});

routerMatematicas.get('/:tema', (request, response) => {
    const tema = request.params.tema;
    const resultados = matematicas.filter( curso => curso.tema === tema);

    if(resultados.length === 0){
        return response.status(404).send(`no se encontraron cursos de ${tema}`);
    }

    response.send(JSON.stringify(resultados));
});

module.exports = routerMatematicas;