import React from "react";
import NavBar from "../Components/navbar";
import Footer from "../Components/footer/footer";
import axios from "axios";
import { useEffect,useState } from "react";
import colorType from "../js/colorType";
import sla from '../images/scenario.jpeg'
import getEvolutions from "../js/evolutions";
import { usePokedex } from "../context/Context";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  


const ChoosenPokemon = (props) => {
    let { id } = useParams();
    id = parseInt(id)
    const [status,setStatus] = useState([])
    const [types,setTypes] = useState([])
    const {pokemonData,setPokemonData} = usePokedex()
    const [evol,setEvol] = useState([])
    const [pokemonName, setPokemonName] = useState("")
    

    async function Teste() {
        // função que faz a requisição para pegar os dados dos pokemons.
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id + 1}`)
        console.log(res,'somebody?')
        return res
    }

    async function Evolutions(url){
        const res = await axios.get(url)
        return getEvolutions(res.data)
    }

    async function getChain(){
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id + 1}/`)
        return res.data.evolution_chain.url
    }
    // async function GetStatus(id){
    //     let res = await Teste(id)
    //     setStatus(res)
    // }
    

    useEffect(() => {
        // useEffect que carrega a pagina a primeira vez ou quando é feito o refresh
        const getStatus = async () => {
            try{
                const PokemonsStatus = await Teste()
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
                const evolutions = await Evolutions(url_chain)
                console.log(evolutions,'evssss')
                setEvol(evolutions)
                // let x = getEvolutions(evolutions.data)
                // console.log(x,'allalalalal')
            }
            catch(error){
                console.log('error aqui', error)
            }
        }

        getStatus()
        getEvolutions()
    },[])

    // useEffect(() => {
    //     let x = getEvolutions(evol)
    //     console.log(evol,'xoxoxo')
    //     console.log(x,'xaxaxa')
    // },[evol])

    return (
        <div className="container-fluid p-0 m-0">
        <NavBar/>
        <div className="container-fluid overflow-y-visible">
        <div className="bg-image mt-1  background-image" style={{backgroundImage: `url('${sla}')`,minHeight: '85vh'}}>
             
             <div className="row d-flex overflow-auto justify-content-evenly">
             <div className="col-sm-12 col-md-6">
                <div className="container-flud d-flex flex-column justify-content-center align-items-center p-0 border mt-1 mb-2 rounded" style={{backgroundColor: 'white'}}>
                    <h5>{pokemonName}</h5>
                    {console.log(pokemonData,'pokemon data')}
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id + 1}.png`} alt="pokemon image" className="w-25"></img>
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
                                    {/* {console.log(stat)} */}
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
                        <h5 className="align-self-center">Evolution Chain</h5>
                        <div className="d-flex w-100 justify-content-evenly">
                            {evol.map((evol) => (
                                
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evol.numero}.png`} alt="pokemon image" className="w-25"></img>
                                
                            ))}
                        </div>
                    </div>
                </div>
             </div>
             <div className="row">
                <h1>EAE</h1>
             </div>
            </div>
            

        </div>
       
        </div>
        <Footer/>
        </div>
    )
}

export default ChoosenPokemon