const { response } = require('express');
const express = require('express');
const { request } = require('http');
const app = express();

const {infoCursos} = require('./cursos.js');

// routers
const routerProgramacion = express.Router();
app.use('/api/cursos/programacion', routerProgramacion); 

const routerMatematica = express.Router();
app.use('/api/cursos/matematicas', routerMatematica);




// routing 
app.get('/', (request, response) => {
    response.send('mi primer servidor. cursos');
});

app.get('/api/cursos', (request, response) => {
    response.send(JSON.stringify(infoCursos));
});


routerProgramacion.get('/', (request, response) => {
    response.send(JSON.stringify(infoCursos.programacion));
});





routerProgramacion.get('/:lenguaje', (request, response) => {
    const lenguaje = request.params.lenguaje;
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

    if (resultados.length === 0){
        return response.status(404).send(`no se encontraron cursos de ${lenguaje}`);
    }
    console.log(request.query.ordenar);

    if (request.query.ordenar === 'vistas'){
        return response.send(JSON.stringify(resultados.sort((a,b) => b.vistas - a.vistas)));
    } 
    response.send(JSON.stringify(resultados));
});

routerProgramacion.get('/:lenguaje/:nivel', (request, response) => {
    const lenguaje = request.params.lenguaje;
    const nivel = request.params.nivel;

    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if (resultados.lenght === 0){
        return response.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
    }
    response.send(JSON.stringify(resultados));
});


routerProgramacion.get('/', (request, response) => {
    response.send(JSON.stringify(infoCursos.matematicas));
});

routerProgramacion.get('/:tema', (request, response) => {
    const tema = request.params.tema;
    const resultados = infoCursos.matematicas.filter( curso => curso.tema === tema);

    if(resultados.length === 0){
        return response.status(404).send(`no se encontraron cursos de ${tema}`);
    }

    response.send(JSON.stringify(resultados));
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`el servidor esta escuchando en el puerto ${PUERTO}...`);
});