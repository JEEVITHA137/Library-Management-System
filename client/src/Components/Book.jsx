import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Book extends Component {
    state = { 
        book: {}
     }

    componentDidMount = () => {
        const { match: { params } } = this.props;

        const headers = {
            method: 'GET',
        };
    
        fetch(`http://localhost:1337/books/${params.id}`, headers)
            .then(response => response.json())
            .then(response => {
                this.setState({ book : response });
            })
            .catch(err => console.log(err));
    }

    render() { 
        return ( 
            <div>
              <h3>{this.state.book.name}</h3>
              <h5>Author: {this.state.book.author}</h5>
              <h5>Description: {this.state.book.description}</h5>
                { this.state.book.quantity  ? <Link to={{pathname:`/books/${this.state.book.id}/borrow`}}><p>Borrow a Book</p></Link> : <p>No Stock is Available</p> }
            </div>

         );
    }
}
 
export default Book;


