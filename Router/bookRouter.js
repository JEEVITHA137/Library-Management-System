const Books = require('../models/book');
const user = require('../models/user');

module.exports = [
    {
        method: 'GET',
        path: '/book',
        handler:  async function(request, reply) {
           let value = await Books.findAll({order:[['name','ASC']]});
           value =  JSON.stringify(value,null,2);
           const results = JSON.parse(value)
           reply.view('booksAdmin',{results},{ layout: 'admin/default'})
        }
    },
    {
        method: 'POST',
        path: '/book',
        handler: async function(request,reply){
            await Books.create({name:request.payload.name, author:request.payload.authour, description:request.payload.description, quantity:request.payload.quantity, cost:request.payload.cost})
            .then(()=>{return reply('<h1>Book Added Successfully</h1><a href="/book">Books</a>')})
            .catch((err)=>{return reply(err)});
        }
    },
    {
        method: ['POST','PUT'],
        path: '/book/{id}',
        handler: async function(request, reply) {
            await Books.update({name:request.payload.name, author:request.payload.author, description:request.payload.description, quantity:request.payload.quantity,cost:request.payload.cost},{
                where:{id:request.params.id}
            })
            .catch((err) => console.log(err));
            return reply.redirect('/book');
        }
    },
    {
        method: 'GET',
        path: '/book/{id}',
        handler:async function(request, reply) {
            let value = await Books.findAll({where:{id:request.params.id}});
            value = JSON.stringify(value,null,2);
            const results = JSON.parse(value);
            return reply.view('viewbookAdmin',results[0],{layout:'admin/default'});
        }
    },
    {
        method:['GET','DELETE'],
        path: '/book/delete/{id}',
        handler:async function(request, reply) {
            await Books.destroy({where:{id:request.params.id}})
            .catch((err) => console.log(err));
            return reply.redirect('/book');
        }
    },
    {
        method: 'GET',
        path: '/book/add',
        handler: (request, reply) => {
            reply.file('addBook.html');
        }
    },
    {
        method: 'GET',
        path: '/book/edit/{id}',
        handler: async function(request, reply) {
            let value = await Books.findAll({where:{id:request.params.id}});
            value = JSON.stringify(value,null,2);
            const results = JSON.parse(value);
            reply.view('editBook',results[0],{ layout: 'admin/default'});
        }
    },
    {
        method: 'GET',
        path: '/books/all',
        handler:  async function(request, reply) {
           let value = await Books.findAll({order:[['name','ASC']]});
           value =  JSON.stringify(value,null,2);
           const results = JSON.parse(value)
           reply.view('books',{results})
        }
    },
    {
        method: 'GET',
        path: '/viewbooks/{id}',
        handler:async function(request, reply) {
            let value = await Books.findOne({where:{id:request.params.id}});
            value = JSON.stringify(value,null,2);
            const results = JSON.parse(value);
            return reply.view('viewbookUser',{results});
        }
    }
];
