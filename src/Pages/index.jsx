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
import PokemonUrl from '../js/pokemonImgUrl'
import '../style.css'
import SubHeader from "../Components/sub-header/sub-header";


const Index = (props) => {
    const pokemonsNumber = 20;
    const [pokemonsList, setPokemonsList] = useState([])
    const [page_url, setPageUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
    const [initial_index,setInitiaLIndex] = useState(0)
    const [intialPage,setInitiaPage] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const [pagesNumber,setPagesNumber] = useState([0,1,2])
    const listItems = [];
    const {pokemonData,setPokemonData,pokemonId,setPokemonId,pokemonNameChoosen, setPokemonNameChoosen,gameStyle, setGameStyle} = usePokedex()
    

    let navigate = useNavigate(); 
  
  const pages = (number) => {
    let list = []
    if(number >= 0){
      for(let i = 0; i < 3; i++){
        list.push(number + i)
  
      }
    }
    else {
      list = [0,1,2]
    }
    
    let maiorValor = Math.max(...list)
    // console.log(maiorValor,'aaaa maior')
    list.push(maiorValor+1)
    let menorValor = Math.min(...list)
    list.unshift(menorValor-1)

              

    return list

  }

  useEffect(() => {
    let list = pages(pageNumber)
    setPagesNumber(list)
    
  },[pageNumber])
    
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
            // console.log(integer,'teste')
            setPageNumber(integer)
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
        {/* <SubHeader/> */}
        <div className="container-fluid overflow-y-visible p-0">
      <div className="d-flex-wrap justify-content-center row row-cols-2  row-cols-sm-2 row-cols-md-4 row-cols-xl-6 overflow-auto background-image p-0" style={{gap: '0.8rem',maxHeight: '87vh', backgroundImage: `url(${sla})`}}>
      
      {pokemonsList.map((pokemon, index) => (
        
        // map to create all pokemon cards in the page
        <div key={index} className="card mt-3 d-flex justify-content-center align-items-center" style={{backgroundColor: 'rgba(245, 245, 245, 0.5)'}}>
            <div className="container-fluid text-center">
              <h6 className="align-self-end">Pokedex Number: #{initial_index+index}</h6>
                <h5 className="card-title text-center " style={{textTransform: 'capitalize'}}>{pokemon?.name}</h5>
            </div>
            
            <div className="card-body">
            
            {
              
              <img src={PokemonUrl(gameStyle,initial_index+index+1)} className="card-img-bottom w-100 h-75 img-fluid" alt="..."></img>
              
            }
            
            
            
            
            <div className="card-text text-center">
            <a className="btn btn-primary btn-small" onClick={() => {handleButtonClick(initial_index+index, pokemon, pokemon?.name)}}>Check Status!</a>
            </div>
            
        </div>
          
        </div>

        
      ))}

      <div className="container-fluid d-flex  justify-content-center w-100">
            <ul className="pagination justify-content-center">
            {pagesNumber.map((number, index) => {
              if(index == 0){
                return (
                  <li key={number} className="page-item">
                    <a className="page-link" onClick={() => changePage(number - 1)}>Previous</a>
                  </li>
                );
              }
              else if(index === pagesNumber.length - 1){
                return (
                  <li key={number} className="page-item">
                  <a className="page-link" onClick={() => changePage(number - 1)}>Next</a>
                </li>
                )
              }
              else if(number -1 >= 0){
                return (
                  
                  <li key={number} className="page-item">
                    <a className="page-link" onClick={() => changePage(number - 1)}>{number-1}</a>
                  </li>
                );
                
              }
                
              })
              
              
              }
            </ul>
    </div>
    </div>
    </div>
    <Footer/>
    </>
    )
}

export default Index