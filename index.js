const Hapi = require('hapi');
const path = require('path');

const init = async() => {
    const server = new Hapi.Server();

    server.connection({ 
        host: 'localhost',
        port: 1337,
        routes: {
            files: {
                relativeTo: path.join(__dirname,'public')
            }
        }
    });

    let user;

    await server.register([require('inert'),require('vision')]);

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: path.join(__dirname,'views'),
        layout:'user/default'
    })

    const userRouter =  require('./Router/userRouter');
    server.route(userRouter);

    const bookRouter = require('./Router/bookRouter');
    server.route(bookRouter)

    const borrowRouter = require('./Router/borrowRouter');
    server.route(borrowRouter)

    await server.start();
    console.log(`Server Started at ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();