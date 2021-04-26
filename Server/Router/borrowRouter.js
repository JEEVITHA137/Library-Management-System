const Sequelize = require('sequelize');
const Users = require('./userRouter');
const Book = require('../models/book');
const Borrow = require('../models/borrow');

module.exports = [
    {
        method: 'GET',
        path: '/borrow/view',
        handler: async function(request, reply) {
            const user = request.state.session.user;
            let results;
            if(user != "")
            {
                let value = await Borrow.findAll({where:{user_id:user}}).catch((err) => console.log(err));
                value = JSON.stringify(value,null,2);
                results = JSON.parse(value);
                
                for(let i of results)
                {
                    console.log(i.start_at)
                    const startDate = i.start_at.split('T');
                    const endDate = i.end_at.split('T');
                    i.start_at = startDate[0];
                    i.end_at = endDate[0];
                }
            }
            
            return reply.view('viewborrowbook',{results,user})
        }
    },
    {
        method: 'GET',
        path: '/borrow/{id}',
        handler: async function(request, reply) {
            const user = request.state.session.user;
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
            const user = request.state.session.user;
            let start_date = new Date(request.payload.start_at);
            let end_date = new Date(request.payload.return_at);
            await Borrow.create({book_id:request.params.id, user_id:user, start_at:start_date, end_at:end_date,status:false})
            .then(()=>{return reply.redirect('/books/all')})
            .catch((err)=>{console.log(err);return reply(err)});
            await Book.decrement('quantity', { where: { id: request.params.id }})
            .catch((err) => console.log(err));
        }
    },
    {
        method: ['GET','PUT'],
        path: '/return/{id}',
        handler: async function(request, reply) {
            await Borrow.update({status:true},{
                where:{id:request.params.id}
            }).catch((err) => console.log(err));
            await Book.increment('quantity', { where: { id: request.query.book }})
            .catch((err) => console.log(err));
            return reply.redirect('/books/all');
        }
    }
];
