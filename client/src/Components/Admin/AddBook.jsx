import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class AddBook extends Component {
    state = { 
        name: "",
        author: "",
        description: "",
        quantity: "",
        cost: ""
    }

    handleFormSubmit = async() => {
        const data = {
            name: this.state.name,
            author: this.state.author,
            description: this.state.description,
            quantity: this.state.quantity,
            cost: this.state.cost
        }

        const headers = {
            method:'POST',
            credentials: 'include',
            body: JSON.stringify(data),
        };

        await fetch('http://localhost:1337/books',headers)
        .then(response => response.json())
        .then(response =>{
            console.log(response)
            this.props.history.push('/');
        })
        .catch(err => {
            console.log(err)
        })

        this.props.history.push('/home')
    }


    render() { 
        console.log(this.props)
        return ( 
            <div  className="login-form">
            { this.props.isAdmin 
                ?  <div>
                    <h2>AddBook</h2>
                    <label htmlFor="name" >Name</label>
                    <input className="form-control"  type="text" value={this.state.name} id="name" onChange={(e) => {this.setState({ name: e.target.value });}} />
                    <label htmlFor="author">Author</label>
                    <input className="form-control"  type="text" value={this.state.author} id="author" onChange={(e) => {this.setState({ author: e.target.value });}} />
                    <label htmlFor="description">Description</label>
                    <input className="form-control"  type="text" value={this.state.description} id="description" onChange={(e) => {this.setState({ description: e.target.value });}} />
                    <label htmlFor="quantity">Quantity</label>
                    <input className="form-control"  type="number" value={this.state.quantity} id="quantity" onChange={(e) => {this.setState({ quantity: e.target.value });}} />
                    <label htmlFor="cost">Cost</label>
                    <input className="form-control"  type="number" value={this.state.cost} id="cost" onChange={(e) => {this.setState({ cost: e.target.value });}} />
                    <input className="btn btn-primary btn-block mt-3" type="submit" onClick={this.handleFormSubmit} value="Add Book"/>
                  </div>
                : <div className="text-center">Invalid</div>
            }
            </div>
        );
    }
}
 
export default withRouter(AddBook);