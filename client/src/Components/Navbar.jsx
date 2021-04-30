import React from 'react';
import { Link } from 'react-router-dom';

async function Logout() {
    const headers = {
        method:'GET',
        AccessControlAllowCredentials: true,
        withCredentials: true,
        credentials: 'include',
      };
  
    await fetch('http://localhost:1337/logout',headers);

    window.location.reload(false)
}

const Navbar = ({value}) => {
    console.log(value)
    return ( 
        <div className="navbar navbar-light bg-dark">
          <h3 className="text-white"> <Link className="nav-link text-white" to='/'>Library Management System</Link></h3>
          {value.isLogged && value.isAdmin
            ? <ul className="nav justify-content-end">
                <Link className="nav-link text-white" to='/home'>Home</Link>
                <Link className="nav-link text-white" to='/books/add'>AddBooks</Link>
                <p onClick={Logout} className="nav-link text-white" to='/signup'>Logout</p>
              </ul>
            : value.isLogged 
                ? <ul className="nav justify-content-end">
                    <Link className="nav-link text-white" to='/'>Home</Link>
                    <Link className="nav-link text-white" to='/books/borrow'>Borrow Books</Link>
                    <p onClick={Logout} className="nav-link text-white" to='/signup'>Logout</p>
                  </ul>
                : <ul className="nav justify-content-end">
                    <Link className="nav-link text-white" to='/login'>Login</Link>
                    <Link className="nav-link text-white" to='/signup'>Signup</Link>
                  </ul>
           }
        </div>
    );
}
 
export default Navbar;
