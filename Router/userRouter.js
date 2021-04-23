const Users = require('../models/user');
const Books = require('../models/book');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('Library_Management_System','postgres','postgres',{
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

let user;

module.exports = [
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
                return reply.redirect('/viewbooks')
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
            return reply.redirect('/viewbooks');
        }
    },
    {
        method: 'GET',
        path: '/viewbooks',
        handler:  async function(request, reply) {
           let value = await Books.findAll({order:[['name','ASC']]});
           value =  JSON.stringify(value,null,2);
           const results = JSON.parse(value)
           reply.view('books',{results,user})
        }
    },
    {
        method: 'GET',
        path: '/viewbooks/{id}',
        handler:async function(request, reply) {
            let value = await Books.findAll({where:{id:request.params.id}});
            value = JSON.stringify(value,null,2);
            const results = JSON.parse(value);
            return reply.view('viewbookUser',{results,user});
        }
    },
    {
        method: 'GET',
        path: '/borrow',
        handler: async function(request, reply) {
            var currentDate = new Date();
            var date = currentDate.getDate();
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            const [results,metadata] =  await sequelize.query(`SELECT * FROM borrow WHERE user_id=${user};`);
            return reply.view('viewborrowbook',{results,date,month,year})
        }
    },
    {
        method: 'GET',
        path: '/borrow/{id}',
        handler: function(request, reply) {
            const data = {
                book_id:request.params.id,
                user_id:user
            }
            console.log(user)
            return reply.view('borrow',data)
        }
    },
    {
        method: 'POST',
        path: '/borrow/{id}',
        handler:async function(request, reply) {
            
            let start_date = new Date(request.payload.start_at);
            let end_date = new Date(request.payload.return_at);
            const [results1,metadata1] =  await sequelize.query(`UPDATE Book SET quantity = quantity-1 WHERE id=${request.params.id};`);
            const [results2,metadata2] =  await sequelize.query(`INSERT INTO public.borrow(book_id, user_id, start_at, end_at,status) VALUES (${request.params.id}, ${user}, '${start_date.getDate()}-${start_date.getMonth()}-${start_date.getFullYear()}', '${end_date.getDate()}-${end_date.getMonth()}-${end_date.getFullYear()}',false);`);
            return reply.redirect('/viewbooks');
        }
    },
    {
        method: ['GET','PUT'],
        path: '/return/{id?}',
        handler: async function(request, reply) {
            const [results,metadata] =  await sequelize.query(`UPDATE borrow SET status=TRUE WHERE user_id=${user} AND book_id=${request.params.id};`);
            const [results1,metadata1] =  await sequelize.query(`UPDATE Book SET quantity = quantity+1 WHERE id=${request.params.id};`);
            console.log("update done")
            return reply.redirect('/viewbooks');
        }
    }
];