

const page = (interger,pokemonNumbers) => {
    let value = pokemonNumbers * interger
    let page_url =  `https://pokeapi.co/api/v2/pokemon?offset=${value}&limit=20`
    return page_url
}

export default page