const PokemonUrl = (gameStyle,initial_index) => {
        let url = null
        gameStyle 
        ? 
        url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${initial_index}.png`
        : 
        url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${initial_index}.png`
      return url
}

export default PokemonUrl
