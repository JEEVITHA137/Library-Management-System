import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
    state = { 
        username:"",
        password:"",
        loggedin:false,
        error:false
    }

    handleNameChange = (event) => {
        this.setState({
            username: event.target.value,
            error:false
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

        const config = {
            method:'POST',
            AccessControlAllowCredentials: true,
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(data)
        };

        await fetch('http://localhost:1337/login',config)
        .then(response => response.json())
        .then(response =>{
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({ error: true });
        })

        this.props.checkIsLoggedIn();
    }

    render() { 
        return ( 
            <div className="login-form">
                {this.state.loggedin ? <Redirect to="/"/> : null}
                <div>
                    <h2>Login</h2>
                    <label htmlFor="username" >Username</label>
                    <input className="form-control" type="text" value={this.state.username} onChange={this.handleNameChange} id="username"/>
                    <label htmlFor="password">PassWord</label>
                    <input className="form-control" type="password" value={this.state.password} onChange={this.handlePasswordChange} id="password"/>
                    <input  className="btn btn-primary btn-block mt-3" type="submit" onClick={this.handleFormSubmit} value="Login"/>
                </div>
                <p className="text-center"><Link to="/signup">Create Account</Link></p>
                {this.state.error ? <p>Invalid Credentials</p> : null }
            </div>
        );
    }
}
 
export default Login;