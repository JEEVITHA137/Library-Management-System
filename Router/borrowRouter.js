const Sequelize = require('sequelize');
const Users = require('./userRouter');

const sequelize = new Sequelize('Library_Management_System','postgres','postgres',{
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

module.exports = [
    {
        method: 'GET',
        path: '/borrow/view',
        handler: async function(request, reply) {
            var currentDate = new Date();
            const date = currentDate.getDate();
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear();
            const user = Users.getUser();
            const [results,metadata] =  await sequelize.query(`SELECT * FROM borrow WHERE user_id=${user};`);
            return reply.view('viewborrowbook',{results,date,month,year,user})
        }
    },
    {
        method: 'GET',
        path: '/borrow/{id}',
        handler: async function(request, reply) {
            const user = Users.getUser();
            const data = {
                book_id:request.params.id,
                user_id:user
            }
            return reply.view('borrow',data)
        }
    },
    {
        method: 'POST',
        path: '/borrow/{id}',
        handler:async function(request, reply) {
            const user = Users.getUser();
            let start_date = new Date(request.payload.start_at);
            let end_date = new Date(request.payload.return_at);
            
            const [results1,metadata1] =  await sequelize.query(`UPDATE Book SET quantity = quantity-1 WHERE id=${request.params.id};`);
            const [results2,metadata2] =  await sequelize.query(`INSERT INTO public.borrow(book_id, user_id, start_at, end_at,status) VALUES (${request.params.id}, ${user}, '${start_date.getDate()}-${start_date.getMonth()}-${start_date.getFullYear()}', '${end_date.getDate()}-${end_date.getMonth()}-${end_date.getFullYear()}',false);`);
            return reply.redirect('/books/all',+request.query.user);
        }
    },
    {
        method: ['GET','PUT'],
        path: '/return/{id}',
        handler: async function(request, reply) {
            const user = Users.getUser();
            const [results,metadata] =  await sequelize.query(`UPDATE borrow SET status=TRUE WHERE user_id=${user} AND book_id=${request.params.id};`);
            const [results1,metadata1] =  await sequelize.query(`UPDATE Book SET quantity = quantity+1 WHERE id=${request.params.id};`);
            console.log("update done")
            return reply.redirect('/books/all/',+request.query.user);
        }
    }
];
