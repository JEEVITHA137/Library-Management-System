const Books = require('../models/book');

module.exports = [{
    method: 'GET',
    path: '/books',
    handler:  async function(request, reply) {
        let value = await Books.findAll({
            attributes: ['id','name', 'author'],
            order:[['name','ASC']]
        });
        reply(value).code(200);
    }
}, 
{
    method: 'POST',
    path: '/books',
    config:{
        auth:{
            strategy:'loginAuth'
        },
        handler: async function(request,reply) {
            const results = JSON.parse(request.payload);
            console.log(results)
            await Books.create({name:results.name, author:results.author, description:results.description, quantity:results.quantity, cost:results.cost})
            .catch((err)=> reply(err));

            reply(results);
        }
    }
}, 
{
    method: 'PUT',
    path: '/books',
    config:{
        auth:{
            strategy:'loginAuth'
        },
        handler: async function(request, reply) {
            const results = JSON.parse(request.payload);
            console.log(results)

            await Books.update({name:results.name, author:results.author, description:results.description, quantity:results.quantity,cost:results.cost},{
                where:{id:results.id}
            })
            .catch((err) => console.log(err));

             return reply("Updated");
        }
    }
}, 
{
    method: 'DELETE',
    path: '/books',
    config:{
        auth:{
            strategy:'loginAuth'
        },
        handler:async function(request, reply) {
            console.log(request.payload)
            await Books.destroy({where:{id:request.payload}})
            .catch((err) => console.log(err));
            return reply('Deleted Successfully');
        }
    }
},  
{
    method: 'GET',
    path: '/books/{id}',
    handler:async function(request, reply) { 
        let value = await Books.findOne({where:{id:request.params.id}});
        value = JSON.stringify(value,null,2);
        const results = JSON.parse(value);
        return reply(results);
}
}];
