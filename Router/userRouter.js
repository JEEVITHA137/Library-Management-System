const Users = require('../models/user');
let user = "";

const getUser  = () =>{
    return user;
}

const UserRouter = [
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply.file('login.html');
        }
    },
    {
        method: 'POST',
        path: '/',
        handler: async function(request, reply) {
            let value = await Users.findAll({where:{username:request.payload.username, password:request.payload.password}});
            value = JSON.stringify(value,null,2);
            const results = JSON.parse(value);
 
            if(results.length === 0)
            {
                return reply("<h1>Incorrect Credentials</h1>")
            }

            if(request.payload.username === "Admin")
            {
                return reply.redirect('/book')
            }
            else{
                user = results[0].user_id;
                return reply.redirect('/books/all');
            }
        }
    },
    {
        method: 'GET',
        path: '/signup',
        handler: (request, reply) => {
            reply.file('signin.html');
        }
    },
    {
        method: 'POST',
        path: '/signup',
        handler: async function(request,reply){
            await Users.create({username:request.payload.username, password:request.payload.password})
            .catch((err) => console.log(err));
            return reply.redirect('/books/all');
        }
    },
    {
        method: 'GET',
        path: '/getuser',
        handler: async function(request,reply){
            return reply(user);
        }
    }
];

module.exports = {
    UserRouter,
    getUser
}