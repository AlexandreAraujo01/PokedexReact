import React, { createContext, useContext, useState } from "react";

const PokedexContext = createContext()

export const PokedexProvider = ({children}) => {

   
    const [pokemonData,setPokemonData] = useState("")
    const [pokemonId,setPokemonId] = useState(0)
    const [pokemonNameChoosen, setPokemonNameChoosen] = useState("")
    const [routeKey, setRouteKey] = useState(0);
    const [gameStyle, setGameStyle] = useState(false)

    return (
        <PokedexContext.Provider value={{pokemonData,setPokemonData,pokemonId,setPokemonId,pokemonNameChoosen, setPokemonNameChoosen, routeKey, setRouteKey, gameStyle, setGameStyle}}>
            {children}
        </PokedexContext.Provider>
    )
}

export const usePokedex = () => useContext(PokedexContext)