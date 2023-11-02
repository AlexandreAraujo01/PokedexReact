import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import reactlogo from '../images/react.png' 
import { Link } from 'react-router-dom';
import '../index.css'



const NavBar = (props) => {
    return (
        <nav className="container-fluid navbar bg-body-tertiary p-0">
      <div className="container-fluid p-2">
      <Link to="/" style={{ textDecoration: 'none', color: 'black', fontSize: '1.5rem'}}>
          <img src={reactlogo} style={{animation: 'rotation 2.8s infinite linear'}} alt="Logo" width="35" height="35" className="d-inline-block align-text-top" />
          <span>Pokedex React</span>
        </Link>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search a Pokemon!" aria-label="Search" />
          <button className="btn btn-outline-danger" type="submit">Search</button>
        </form>
      </div>
    </nav>
    )
}

export default NavBar