import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';


class Signup extends Component {
    state = { 
        username:"",
        password:"",
        error:false
    }

    handleNameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleFormSubmit = async() => {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        const headers = {
            method:'POST',
            AccessControlAllowCredentials: true,
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(data)
          };

        await fetch('http://localhost:1337/signup',headers)
        .then(response => response.json())
        .then(response =>{
           this.props.history.push('./')
        })
        .catch(err => {
            console.log(err)
            this.setState({ error: true });
        })
        
        this.props.checkIsLoggedIn();
    }

    render() { 
        return ( 
            <div  className="login-form">
                {this.state.loggedin ? <Redirect to="/"/> : null}
                <div>
                    <h2>Signup</h2>
                    <label htmlFor="username" >Username</label>
                    <input className="form-control"  type="text" value={this.state.username} onChange={this.handleNameChange} id="username"/>
                    <label htmlFor="password">Password</label>
                    <input className="form-control"  type="password" value={this.state.password} onChange={this.handlePasswordChange} id="password"/>
                    <input className="btn btn-primary btn-block mt-3" type="submit" onClick={this.handleFormSubmit} value="Signup"/>
                </div>
                {this.state.error ? <p>Error</p> : null }
                <p className="text-center"><Link to="/login">Already have an account</Link></p>
            </div>
        );
    }
}
 
export default Signup;