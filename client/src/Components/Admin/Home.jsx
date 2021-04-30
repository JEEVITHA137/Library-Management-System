import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    state = { 
        books:[],
        credentials: 'include'
    }

    componentDidMount = async() => {
        const headers = {
            method:'GET',
          };

        await fetch('http://localhost:1337/books',headers)
        .then(response => response.json())
        .then(response => {
          this.setState({
              books:response
          })
        })
        .catch(err => console.log(err))
    }

    onDeleteBook = async(id) => {
        const headers = {
            method:'DELETE',
            AccessControlAllowCredentials: true,
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(id)
          };

        await fetch(`http://localhost:1337/books`,headers)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.log(err));

        window.location.reload(false);
    }

    render() { 
        return ( 
            <div>
                <h3>Books</h3>
                <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                    this.state.books.map((book,i) => {
                        return(
                          <tr key={i}>
                            <th>{i+1}</th>
                            <td><Link to={{pathname:`/books/${book.id}`}}>{book.name}</Link></td>
                            <td>{book.author}</td>
                            <td><button className="btn btn"><Link to={{pathname:`/books/edit/${book.id}`}}>Edit</Link></button></td>
                            <td><button className="btn btn-danger" onClick={() => {this.onDeleteBook(book.id)}}>Delete</button></td>
                          </tr>
                        )
                    })
                }
                </tbody>
                </table>
            </div>
         );
    }
}
 
export default Home;