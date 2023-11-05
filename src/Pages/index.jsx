import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import NavBar from "../Components/navbar";
import axios from "axios";
import Footer from "../Components/footer/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import page from '../js/incrimentPage'
import sla from '../images/scenario.jpeg'
import pokeball from '../images/pokeball.jpg'
import { Link } from 'react-router-dom';
import { usePokedex } from "../context/Context";


const Index = (props) => {
    const pokemonsNumber = 20;
    const [pokemonsList, setPokemonsList] = useState([])
    const [page_url, setPageUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
    const [initial_index,setInitiaLIndex] = useState(0)
    const [intialPage,setInitiaPage] = useState(0)
    const listItems = [];
    const {pokemonData,setPokemonData,pokemonId,setPokemonId,pokemonNameChoosen, setPokemonNameChoosen} = usePokedex()
    

    let navigate = useNavigate(); 
    
    
  const routeChange = (id) =>{ 
    // função que redireciona para a pagina do pokemon escolhido
    console.log(id, 'id escolhidooooo')
    // setPokemonId(id)
    console.log(`/pokemon/${id}`,'navigateeeee')
    let path = `/pokemon/${id}`; 
    navigate(path);
  }

    async function getPokemons() {
        // função que faz a requisição para pegar os dados dos pokemons.
        const res = await axios.get(page_url)
        return res
    }

   
    const  changePage = (integer) => {
        // função que troca a pagina
         if(integer >= 0){
            setPageUrl(page(integer,pokemonsNumber))
            setInitiaPage(integer)
            let v = pokemonsNumber * integer
            setInitiaLIndex(v)
         }
         

    }

    const handleButtonClick = (index,pokemonData,PokemonName) => {
        // função que realiza a troca de pagina para o pokemon escolhido
        console.log(PokemonName,'handleButtonClick')
        setPokemonNameChoosen(PokemonName)
        setPokemonId(index)
        routeChange(PokemonName);
        setPokemonData(pokemonData);
      };

    async function Teste(name){
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        console.log(res,'ZIMBABUE')
    }
    

    useEffect(() => {
        // useEffect que carrega a pagina a primeira vez ou quando é feito o refresh
        const loadPokemons = async () => {
            try{
                const PokemonsList = await getPokemons()
                console.log(PokemonsList.data.results, 'resultados')
                setPokemonsList(PokemonsList.data.results)
            }
            catch(error){
                console.log('error')
            }
        }

        loadPokemons()
    },[])

    useEffect(() => {
        //  useEffect que carrega a pagina sempre que o usuario troca o index da pagina.
        const loadPokemons = async () => {
            try{
                const PokemonsList = await getPokemons()
                setPokemonsList(PokemonsList.data.results)
            }
            catch(error){
                console.log('error')
            }
        }

        loadPokemons()
    },[page_url])
    
    for (let i = 0; i < 3; i++) {
        // for para criar os indices
        listItems.push(
          <li key={i} className="page-item">
            <a className="page-link" onClick={() => changePage(i)}>{i + 1}</a>
          </li>
        );
      }

      listItems.push(<li key={11} className="page-item">
      <a className="page-link" onClick={() => changePage(intialPage+1)}>Next</a>
    </li>)

    listItems.unshift(<li key={11} className="page-item">
    <a className="page-link" onClick={() => changePage(intialPage-1)}>Previous</a>
  </li>)


    
    return (
        <>
        <NavBar /> 
        <div className="container-fluid overflow-y-visible">
      <div className="d-flex-wrap justify-content-center row row-cols-2  row-cols-sm-2 row-cols-md-4 row-cols-xl-6 overflow-auto background-image" style={{gap: '0.8rem',maxHeight: '87vh', backgroundImage: `url(${sla})`}}>
      
      {pokemonsList.map((pokemon, index) => (
        
        // map to create all pokemon cards in the page
        <div key={index} className="card mt-3 d-flex justify-content-center align-items-center" style={{backgroundColor: 'rgba(245, 245, 245, 0.5)'}}>
            <div className="container-fluid text-center">
              <h6 className="align-self-end">Pokedex Number: #{initial_index+index}</h6>
                <h5 className="card-title text-center " style={{textTransform: 'capitalize'}}>{pokemon?.name}</h5>
            </div>
            
            <div className="card-body">
            {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${initial_index+index+1}.png`} class="card-img-bottom" alt="..."></img> */}
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${initial_index+index+1}.png`} class="card-img-bottom img-fluid" alt="..."></img>
            {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${initial_index+index+1}.png`} class="card-img-bottom" alt="..."></img> */}
            {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            
            <div className="card-text text-center">
            <a className="btn btn-primary" onClick={() => {handleButtonClick(initial_index+index, pokemon, pokemon?.name)}}>Check Status!</a>
            </div>
            
        </div>
          
        </div>

        
      ))}

      <div className="container-fluid d-flex  justify-content-center w-100">
            <ul className="pagination justify-content-center">
                {listItems}
            </ul>
    </div>
    </div>
    </div>
    <Footer/>
    </>
    )
}

export default Index