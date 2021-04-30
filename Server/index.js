const Hapi = require('hapi');
const { request } = require('http');
const path = require('path');

const init = async() => {
    const server = new Hapi.Server();

    server.connection({ 
        host: 'localhost',
        port: 1337,
        routes: {
            cors: {
                origin: ['*'], // an array of origins or 'ignore'    
                credentials: true // boolean - 'Access-Control-Allow-Credentials'
            }
        }
    });

    await server.register([require('inert'),require('vision'),require('hapi-auth-cookie')]);

    server.auth.strategy('loginAuth','cookie',{
        password:'ThisIsTheSecretPasswordForTheCookie',
        cookie: 'session',
        isSecure: true,
        isSameSite: false
    })

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: path.join(__dirname,'views'),
        layout:'layouts/default'
    })

    const UserRouter =  require('./Router/userRouter');
    server.route(UserRouter);

    const bookRouter = require('./Router/bookRouter');
    server.route(bookRouter);

    const borrowRouter = require('./Router/borrowRouter');
    server.route(borrowRouter);

    await server.start();
    console.log(`Server Started at ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();