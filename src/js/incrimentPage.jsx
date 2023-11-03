

const page = (interger,pokemonNumbers) => {
    let value = pokemonNumbers * (interger-1)
    let page_url =  `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${value}`
                    
    return page_url
}

export default page