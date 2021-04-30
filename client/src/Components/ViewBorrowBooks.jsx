import React, { Component } from 'react';

class ViewBorrowBooks extends Component {
    state = { 
        books:[]
    }

    componentDidMount = async() => {
        const headers = {
            method:'GET',
            credentials: 'include'
          };

        await fetch('http://localhost:1337/books/borrow',headers)
        .then(response => response.json())
        .then(response => {
          this.setState({
              books:response
          })
        })
        .catch(err => console.log(err))
    }

    returnBook = async(id,book_id) => {
        const data = {
            id:id,
            book_id: book_id
        }

        const headers = {
            method:'PUT',
            body: JSON.stringify(data)
          };

        await fetch('http://localhost:1337/books/borrow',headers)
        .then(response => response.json())
        .then(response => {
          console.log(response)
        })
        .catch(err => console.log(err))
        console.log("returned");

        window.location.reload(false)
    }

    render() { 
        console.log(this.props)
        return ( 
            <div>
            <h3>Books</h3>
            {this.props.isLogged 
              ? <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Book-Id</th>
                    <th>Start-Date</th>
                    <th>End-Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.books.map((book,i) => {
                        return(
                            <tr key={i}>
                            <th>{i+1}</th>
                            <td>{book.book_id}</td>
                            <td>{book.start_at}</td>
                            <td>{book.end_at}</td>
                            <td>{book.status ? null : <button className="btn btn-primary btn-block" onClick={()=>{this.returnBook(book.id,book.book_id)}}>Return</button> }</td>
                            </tr>
                        )
                    })
                }
                </tbody>
                </table>
              : <div className="text-center">You Need to Login</div>
            }
                
               
            </div>
         );
    }
}
 
export default ViewBorrowBooks;