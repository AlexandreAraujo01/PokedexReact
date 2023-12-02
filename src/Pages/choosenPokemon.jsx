import React from "react";
import NavBar from "../Components/navbar";
import Footer from "../Components/footer/footer";
import axios from "axios";
import { useEffect,useState } from "react";
import colorType from "../js/colorType";
import sla from '../images/scenario.jpeg'
import getEvolutions from "../js/evolutions";
import { usePokedex } from "../context/Context";
import { useNavigate } from "react-router-dom";
import PokemonUrl from "../js/pokemonImgUrl";
import '../style.css'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  
  

const ChoosenPokemon = (props) => {
    let navigate = useNavigate(); 
    const { id } = useParams();
    // id = parseInt(id)
    const [status,setStatus] = useState([])
    const [types,setTypes] = useState([])
    const {pokemonData,setPokemonData,pokemonId,setPokemonId,pokemonNameChoosen, setPokemonNameChoosen,routeKey,setRouteKey,gameStyle, setGameStyle} = usePokedex()
    const [evol,setEvol] = useState([])
    const [pokemonName, setPokemonName] = useState("")
    const [idteste,setIdTeste] = useState(0)

    const routeChange = (id) =>{ 
        // função que redireciona para a pagina do pokemon escolhido
        console.log(id, 'id escolhidooooo')
        // setPokemonId(id)
        console.log(`/pokemon/${id}`,'navigateeeee')
        let path = `/pokemon/${id}`;
        setRouteKey(routeKey + 1)
        navigate(path);
      }
    
    
    
    async function Teste() {
        // função que faz a requisição para pegar os dados dos pokemons.
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(id,'choosen one name')
        console.log(res,'somebody?')
        console.log(res.data.id,' id no some')
        setPokemonId(res.data.id - 1)
        setIdTeste(res.data.id -1)

        console.log(id)
        return res
    }

    async function Evolutions(url){
        const res = await axios.get(url)
        return getEvolutions(res.data)
    }

    async function getChain(){
        console.log(pokemonId,'chainnnnnnn id')
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId + 1}/`)
        return res.data.evolution_chain.url
    }
   
    

    useEffect(() => {
        // useEffect que carrega a pagina a primeira vez ou quando é feito o refresh
        const getStatus = async () => {
            try{
                const PokemonsStatus = await Teste()
                
                setIdTeste(PokemonsStatus.data.id -1)
                setPokemonName(PokemonsStatus.data.name)
                setStatus(PokemonsStatus.data.stats)
                setTypes(PokemonsStatus.data.types)

                console.log(PokemonsStatus.data.id -1)
                console.log(idteste,'idteste')
                
                
                
            }
            catch(error){
                console.log('error')
            }
        }

        const getEvolutions = async () => {
            try {
                let url_chain = await getChain()
                const evolutions = await Evolutions(url_chain)
                console.log(evolutions,'evssss')
                setEvol(evolutions)
                
            }
            catch(error){
                console.log('error aqui', error)
            }
        }

        getEvolutions()
        getStatus()
        
    },[])

    useEffect(() => {
        console.log(routeKey,'xiiiiiii')
        const getStatus = async () => {
            try{
                const PokemonsStatus = await Teste()
                
                setIdTeste(PokemonsStatus.data.id -1)
                setPokemonName(PokemonsStatus.data.name)
                setStatus(PokemonsStatus.data.stats)
                setTypes(PokemonsStatus.data.types)

                
                
                
                
            }
            catch(error){
                console.log('error')
            }
        }

        const getEvolutions = async () => {
            try {
                let url_chain = await getChain()
                const evolutions = await Evolutions(url_chain,pokemonName)
                // console.log(evolutions,'evssss')
                setEvol(evolutions)
                
            }
            catch(error){
                console.log('error aqui', error)
            }
        }

        getEvolutions()
        getStatus()

    },[routeKey]) 



    useEffect(() => {

        const getEvolutions = async () => {
            try {
                let url_chain = await getChain()
                const evolutions = await Evolutions(url_chain)
                console.log(evolutions,'evssss 2222')
                setEvol(evolutions)
                
            }
            catch(error){
                console.log('error aqui', error)
            }
        }

        getEvolutions()
    },[idteste])

    return (

        <>  
            <NavBar/>
            {console.log(id,'uuuuu')}
            <div className="container-fluid m-0 p-0">
                <div className="d-flex-wrap justify-content-center overflow-auto background-image" style={{minHeight: '87vh', backgroundImage: `url(${sla})`}}>
                <div className="row m-0 p-0 d-flex justify-content-evenly">
             <div className="col-sm-12 col-md-6">
                <div className="container-flud d-flex flex-column justify-content-center align-items-center p-0 border mt-1 mb-2 rounded" style={{backgroundColor: 'rgba(245, 245, 245, 0.5)'}}>
                    <h5 style={{textTransform: 'capitalize'}} >{pokemonName}</h5>
                    {console.log(pokemonData,'pokemon data')}
                    <img src={PokemonUrl(gameStyle, pokemonId + 1)} alt="pokemon image" className="w-25"></img>
                    <div className="d-flex justify-content-evenly">
                    {types.map((type,index) => (
                        <>
                            <div className="rounded-2  d-flex justify-content-center p-1 m-4" style={{width: '4.0rem', backgroundColor: `${colorType(type.type.name)}`, color: 'white'}}>{type.type.name}</div>
                        </>
                    ))}
                    </div>
                </div>
             </div>
             <div className="row">             
                <div className="col-sm-12 col-md-6 d-flex">
                    <div className="d-flex flex-column w-100 border-top border-end border-start border-bottom rounded">
                            <h5 className="align-self-center">Status</h5>
                            {status.map((stat,index) => (
                                <>
                                    <h6 className="align-self-center">{stat.stat.name} : {stat.base_stat}</h6>
                                    <div className="progress mb-1">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${stat.base_stat}%` }} aria-valuenow={stat.base_stat} aria-valuemin="0" aria-valuemax="100">{stat.base_stat}</div>
                                    </div>
                            </>
                            ))}
                    </div>
                </div>
                
                <div className="col-sm-12 col-md-6">
                    <div className="d-flex flex-column justify-content-center  w-100 border-top border-end border-start border-bottom rounded">
                        <h5  className="align-self-center">Evolution Chain</h5>
                        <div className="d-flex w-100 justify-content-evenly">
                            {evol.map((evol) => (
                                    <div className="d-flex btn flex-column p-2 m-3 justify-content-center align-items-center" style={{backgroundColor: 'rgba(245, 245, 245, 0.5)'}} onClick={() => routeChange(evol.name)}>
                                        <h5 style={{textTransform: 'capitalize'}} >{evol.name}</h5>
                                        <img src={PokemonUrl(gameStyle, evol.numero)} alt="pokemon image" className="w-50 img-responsive-tk"></img>
                                        {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evol.numero}.png`} alt="pokemon image" className="w-50"></img> */}
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
             </div>
            </div>
                </div>
            </div>
            <Footer/>
        </>
        )
}

export default ChoosenPokemon