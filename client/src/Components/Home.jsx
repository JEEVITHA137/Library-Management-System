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