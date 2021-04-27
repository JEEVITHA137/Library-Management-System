const Users = require('../models/user');

module.exports = [
    {
        method: 'GET',
        path: '/',
        config:{
            handler: (request, reply) => {
                if(request.state.session)
                {
                    reply("already authenticated!")
                }
                else{
                    reply.file('login.html');
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/',
        handler: async function(request, reply) {
            let value = await Users.findOne({where:{username:request.payload.username, password:request.payload.password}});

            if(value == null)
            {
                return  reply.redirect('/')
            }
            value = JSON.stringify(value,null,2);
            const results = JSON.parse(value);

            const user = results.user_id;
            request.cookieAuth.set({user});
            
            if(request.payload.username === "Admin")
            {
                return reply.redirect('/book')
            }
            else{
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
        path: '/logout',
        handler: (request,reply) => {
            request.cookieAuth.clear();
            return reply.redirect('/');
        }
    }
];
