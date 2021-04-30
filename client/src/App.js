import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Book from './Components/Book';
import AddBook from './Components/Admin/AddBook';
import BorrowBook from './Components/BorrowBook';
import ViewBorrowBooks from './Components/ViewBorrowBooks';
import AdminHome from './Components/Admin/Home';
import EditBook from './Components/Admin/EditBook'

class App extends Component {
  state = {
    isLogged: false,
    isAdmin: false 
  }

  componentDidMount = () => {
    this.checkIsLoggedIn();
  }

  checkIsLoggedIn = () => {
    const headers = {
      method:'GET',
      credentials: 'include'
    };

    fetch('http://localhost:1337/session',headers)
    .then(response => response.json())
    .then(response =>{
        if(response.user)
        {
          if(response.user === "13")
          {
            this.setState({ isAdmin: true });
          }
          this.setState({ isLogged: true });
        }
        
    })
    .catch(err => {
        console.log(err)
    })
  }

  render() { 
    return (
      <Router>
        <NavBar value={this.state}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={AdminHome} />
          <Route path="/login" render={(props) => <Login {...props} checkIsLoggedIn={this.checkIsLoggedIn} />} />
          <Route path="/signup" render={(props) => <Signup {...props} checkIsLoggedIn={this.checkIsLoggedIn} />} />
          <Route exact path="/books/add" render={(props) => <AddBook {...props} isAdmin={this.state.isAdmin} />} />
          <Route exact path="/books/edit/:id" render={(props) => <EditBook {...props} isAdmin={this.state.isAdmin} />} />
          <Route exact path="/books/borrow">
            <ViewBorrowBooks isLogged={this.state.isLogged}/>
          </Route>
          <Route exact path="/books/:id/borrow">
            <BorrowBook isLogged={this.state.isLogged}/>
          </Route>
          <Route exact path="/books/:id" component={Book} />
        </Switch>
      </Router>
    );
  }
}

export default App;
