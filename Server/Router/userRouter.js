const Users = require('../models/user');

module.exports = [{
    method: 'POST',
    path: '/login',
    handler: async function(request, reply) {
            const results = JSON.parse(request.payload);
            console.log(results)
        
            let value = await Users.findOne({where:{username:results.username, password:results.password}});
            if (value !== null) {
                value = JSON.stringify(value,null,2);
                const result = JSON.parse(value);
                const user = result.user_id;
                request.cookieAuth.set({user});
                reply(results).code(200)
            } else {
                reply(value)
            }
            
   
    } 
}, {
    method: 'POST',
    path: '/signup',
    handler: async function(request,reply) {
        const results = JSON.parse(request.payload);
        console.log(results)

        await Users.create({username: results.username, password: results.password})
        .catch((err) => reply(err));

        let value = await Users.findOne({where:{username:results.username, password:results.password}});
        value = JSON.stringify(value,null,2);
        const result = JSON.parse(value);

        const user = result.user_id;
        request.cookieAuth.set({user});

        reply(results).code(200);
    }
}, {
    method: 'GET',
    path: '/logout',
    handler: (request,reply) => {
        request.cookieAuth.clear();
        return reply("Logout Successfully").code(200);
    }
}, {
    method: 'GET',
    path: '/session',
    handler: (request,reply) => {
        if (request.state.session) {
            return reply(request.state.session);
        } else {
            return reply(false)
        }
    }
}];
