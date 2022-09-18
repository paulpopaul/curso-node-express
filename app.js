const express = require('express');
const app = express();

const {infoCursos} = require('./datos/cursos.js');

// routers
const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion', routerProgramacion); 

const routerMatematica = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematica);

// routing 
app.get('/', (request, response) => {
    response.send('mi primer servidor. cursos');
});

app.get('/api/cursos', (request, response) => {
    response.send(JSON.stringify(infoCursos));
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
    console.log(`el servidor esta escuchando en el puerto ${PUERTO}...`);
});