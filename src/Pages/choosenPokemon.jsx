import React from "react";
import NavBar from "../Components/navbar";
import Footer from "../Components/footer/footer";
import axios from "axios";
import { useEffect,useState } from "react";
import colorType from "../js/colorType";
import sla from '../images/scenario.jpeg'

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

    async function Teste() {
        // função que faz a requisição para pegar os dados dos pokemons.
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id + 1}`)
        console.log(res,'somebody?')
        return res
    }
    // async function GetStatus(id){
    //     let res = await Teste(id)
    //     setStatus(res)
    // }
    

    useEffect(() => {
        // useEffect que carrega a pagina a primeira vez ou quando é feito o refresh
        const getStatus = async (id) => {
            try{
                const PokemonsStatus = await Teste(id)
                setStatus(PokemonsStatus.data.stats)
                setTypes(PokemonsStatus.data.types)
            }
            catch(error){
                console.log('error')
            }
        }

        getStatus()
    },[])

    return (
        <>
        <NavBar/>
        {console.log(sla,'aaaaaa')}
        <div className="bg-image container-fluid overflow-y-visible background-image" style={{backgroundImage: `url('${sla}')`,height: '85vh'}}>
        <div className="container-fluid overflow-auto mt-2" style={{position: "relative"}}>
             
             <div className="row d-flex justify-content-evenly">
             <div className="col-sm-8">
                <div className="container-flud d-flex flex-column justify-content-center align-items-center p-0 border mt-1 mb-2" style={{backgroundColor: 'white'}}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id + 1}.png`} alt="pokemon image" className="w-25"></img>
                    <div className="d-flex justify-content-evenly">
                    {types.map((type,index) => (
                        <>
                            <div className="rounded-2  d-flex justify-content-center p-1 m-4" style={{width: '4.0rem', backgroundColor: `${colorType(type.type.name)}`}}>{type.type.name}</div>
                        </>
                    ))}
                    </div>
                </div>
             </div>
             <div className="row">             
                <div className="col-sm-12 col-md-12 d-flex">
                    <div className="d-flex flex-column w-100 border-top border-end border-start border-bottom">
                            <h6 className="align-self-center">STATUS</h6>
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
                
                <div className="col-sm-12">
                        <h1>oi</h1>
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