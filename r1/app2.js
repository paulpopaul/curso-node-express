const http = require('http');

const servidor = http.createServer( (request, response) => {
    response.end('esty aprendiedo node js, skeleton');
});

const puerto = 3000;

servidor.listen(puerto, () => {
    console.log(`el servidor esta esccuchando en el puerto ${puerto}`);
});