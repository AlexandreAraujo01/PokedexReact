import React, { createContext, useContext, useState } from "react";

const PokedexContext = createContext()

export const PokedexProvider = ({children}) => {

   
    const [pokemonData,setPokemonData] = useState("")
    return (
        <PokedexContext.Provider value={{pokemonData,setPokemonData}}>
            {children}
        </PokedexContext.Provider>
    )
}

export const usePokedex = () => useContext(PokedexContext)