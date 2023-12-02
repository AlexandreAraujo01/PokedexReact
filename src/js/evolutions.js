function getEvolutions(data,pokemonName) {
    const array = [];
    let pokemon = data?.chain?.evolves_to;
    
    
    
    while (true) {
      if (pokemon?.length < 1) {
        break;
      } 
      else {
        const pName = pokemon[0]?.species.name;
        const url = pokemon[0]?.species.url
        const partesDaURL = url.split('/');
        const numero = partesDaURL[partesDaURL.length - 2];
        if(pName !== pokemonName){
          array.push({name: pName, numero: numero});
        }
        pokemon = pokemon[0]?.evolves_to;
        
        
      }
    }
    
    return array
  }

export default getEvolutions


// def GetEvolutions(data):
//     array = []
//     pokemon = data['chain']['evolves_to']
//     while True:
//         if len(pokemon) < 1:
//             break
//         else:
//             p_name = pokemon[0]['species']['name']
//             array.append(p_name)
//             pokemon = pokemon[0]['evolves_to']
//             print(pokemon)
//     print(array)
