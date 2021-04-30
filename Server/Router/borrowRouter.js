const Sequelize = require('sequelize');
const Users = require('./userRouter');
const Book = require('../models/book');
const Borrow = require('../models/borrow');

module.exports = [{
    method: 'GET',
    path: '/books/borrow',
    handler: async function(request, reply) {
        let results;
        if (request.state.session) {
            const user = request.state.session.user;
            
            let value = await Borrow.findAll({where:{user_id:user}})
                .catch((err) => console.log(err));

            value = JSON.stringify(value,null,2);
            results = JSON.parse(value);
            
            for(let i of results) {
                console.log(i.start_at)
                const startDate = i.start_at.split('T');
                const endDate = i.end_at.split('T');
                i.start_at = startDate[0];
                i.end_at = endDate[0];
            }
        }
       
      return reply(results)
    }
}, {
    method: 'POST',
    path: '/books/borrow',
    handler:async function(request, reply) {
        const results = JSON.parse(request.payload);
        console.log(results)
        const user = request.state.session.user;
        let start_date = new Date(results.startDate);
        let end_date = new Date(results.endDate);

        await Borrow.create({book_id:results.bookId, user_id:user, start_at:start_date, end_at:end_date,status:false})
        .catch((err) => {console.log(err)});

        await Book.decrement('quantity', { where: { id: results.bookId }})
        .catch((err) => console.log(err));

        reply(results);
    }
}, {
    method: 'PUT',
    path: '/books/borrow',
    handler: async function(request, reply) {
        const results = JSON.parse(request.payload);
        console.log(results)

        await Borrow.update({status:true}, {
            where:{id:results.id}
        }).catch((err) => console.log(err));

        await Book.increment('quantity', { where: { id: results.book_id}})
        .catch((err) => console.log(err));

        return reply('Return Successfully');
    }
}];
