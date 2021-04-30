import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class BorrowBook extends Component {
    state = { 
        startDate:"",
        endDate:""
    }

    handleFormSubmit = async(id) => {

        const data = {
            bookId: id,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }

        const config = {
            method:'POST',
            AccessControlAllowCredentials: true,
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(data)
        };

        await fetch(`http://localhost:1337/books/borrow`,config)
        .then(response => response.json())
        .then(response =>{
            this.setState({
                startDate:"",
                endDate:""
            })
        })
        .catch(err => {
            console.log(err)
        })

    }

    render() { 
        const {match : {params} } = this.props;
        return ( 
            
            <div  className="login-form">
            { this.props.isLogged 
                ? <div>
                    <h2>BorrowBook</h2>
                    <label> BookId: {params.id}</label><br/>
                    <label htmlFor="startDate">StartDate</label>
                    <input className="form-control"  type="date" value={this.state.startDate} id="startDate" onChange={(e) => {this.setState({ startDate: e.target.value });}}/>
                    <label htmlFor="endDate">EndDate</label>
                    <input className="form-control"  type="date" value={this.state.endDate} id="endDate" onChange={(e) => {this.setState({ endDate: e.target.value });}}/>
                    <input className="btn btn-primary btn-block mt-3" type="submit" onClick={() => this.handleFormSubmit(params.id)} value="Borrow Book"/>
                </div>
                : <div className="text-center">You Need to Login</div>
            }
            </div>

        );
    }
}
 
export default withRouter(BorrowBook);