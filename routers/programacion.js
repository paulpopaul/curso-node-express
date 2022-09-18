const express = require('express');

const {programacion} = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

//middleware
routerProgramacion.use(express.json());

routerProgramacion.get('/', (request, response) => {
    response.send(JSON.stringify(programacion));
});

routerProgramacion.get('/:lenguaje', (request, response) => {
    const lenguaje = request.params.lenguaje;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);

    if (resultados.length === 0){
        return response.status(404).send(`no se encontraron cursos de ${lenguaje}`);
    }
    console.log(request.query.ordenar);

    if (request.query.ordenar === 'vistas'){
        return response.send(JSON.stringify(resultados.sort((a,b) => b.vistas - a.vistas)));
    } 
    //response.send(JSON.stringify(resultados));
    response.json(resultados);

});

routerProgramacion.get('/:lenguaje/:nivel', (request, response) => {
    const lenguaje = request.params.lenguaje;
    const nivel = request.params.nivel;

    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if (resultados.lenght === 0){
        return response.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
        //return response.status(404).end();
    }
    //response.send(JSON.stringify(resultados));
    response.json(resultados);
});

routerProgramacion.post('/', (request, response) => {
    let cursoNuevo = request.body;
    programacion.push(cursoNuevo);
    response.send(JSON.stringify(programacion));
});


routerProgramacion.put('/:id', (request, response) => {
    const cursoActualizado = request.body;
    const id = request.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0){
        programacion[indice] = cursoActualizado;
    }
    response.send(JSON.stringify(programacion));
});

routerProgramacion.patch('/:id', (request, response) => {
    const infoActualizada = request.body;
    const id = request.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0){
        const cursoAModificar = programacion[indice];
        Object.assign(cursoAModificar, infoActualizada);
    }

    response.send(JSON.stringify(programacion));

});


routerProgramacion.delete('/:id', (request, response) => {
    const id = request.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0){
        programacion.splice(indice, 1);
    }
    response.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;