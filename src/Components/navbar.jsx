import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import reactlogo from '../images/react.png' 
import { Link } from 'react-router-dom';
import '../index.css';
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
    const [searchPokemon, setSearchPokemon] = useState(""); 

    // navegador de paginas
    let navigate = useNavigate(); 
    
    
  const routeChange = (id) =>{ 
    // função que redireciona para a pagina do pokemon escolhido
    console.log(id, 'id escolhidooooo')
    // setPokemonId(id)
    console.log(`/pokemon/${id}`,'navigateeeee')
    let path = `/pokemon/${id}`; 
    navigate(path);
  }

    const handleSearch = () => {
        console.log("Conteúdo do input:", searchPokemon);
        routeChange(searchPokemon)

        // Faça o que você quiser com o conteúdo do input aqui
    };

    return (
        <nav className="container-fluid navbar bg-body-tertiary p-0">
            <div className="container-fluid p-2">
                <Link to="/" style={{ textDecoration: 'none', color: 'black', fontSize: '1.5rem'}}>
                    <img src={reactlogo} style={{animation: 'rotation 2.8s infinite linear'}} alt="Logo" width="35" height="35" className="d-inline-block align-text-top" />
                    <span>Pokedex React</span>
                </Link>
                <div className="d-flex">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search a Pokemon!"
                        aria-label="Search"
                        value={searchPokemon}
                        onChange={(e) => setSearchPokemon(e.target.value)}
                    />
                    <button className="btn btn-outline-danger" type="submit" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;