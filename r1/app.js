const http = require('http');

const { infoCursos } = require('./cursos');

const servidor = http.createServer( (request, response) => {
    const {method} = request;

    switch(method){
        case 'GET':
            return manejarSolicitudGet(request, response);
        case 'POST':
            return manejarSolicitudPost(request, response)
        default:
            response.statusCode = 501;
            response.end(`el metodo usado no puede ser manejado por el servidor: ${method} `);
    }
});

function manejarSolicitudGet(request, response){
    const path = request.url;

    if (path === '/'){
        response.writeHead(200, {'Content-Type': 'application/json'})
        return response.end('bienvenido a mi primerservidor api creado por node js');
    } else if (path === '/cursos'){
        return response.end(JSON.stringify(infoCursos));
    } else if (path === '/cursos/programacion'){
        return response.end(JSON.stringify(infoCursos.programacion));
    }

    response.statusCode = 404;
    response.end('el recurso solicitado no existe');
}

function manejarSolicitudPost(request, response){
    const path = request.url;

    if (path === '/cursos/programacion'){

        let cuerpo = '';
        request.on('data', contenido => {
            cuerpo += contenido.toString();
        });

        request.on('end', () => {
            console.log(cuerpo);
            console.log(typeof cuerpo);
            
            cuerpo = JSON.parse(cuerpo);
            
            console.log(typeof cuerpo);
            console.log(cuerpo.titulo);

            response.end('el servidor recibio una solicitud POST para /cursos/programacion');
        });
        //return response.end('el servidor recibio una solicitud POST para /cursos/programacion');
    }
}

const puerto = 3000;

servidor.listen(puerto, () => {
    console.log(`el servidor esta escuchando en el puerto ${puerto}`);
});