

const colorType = (type) => {
    const dictionaryTypes = {"normal": '#a8a878', "fire": "#f08030", "water": "#6890F0", "grass": "#78C850", "electric": "#F8D030", "ice": "#98D8D8",
    "fighting" : "#C03028","poison": "#A040A0","ground": "#E0C068","flying": "#A890F0", "psychic": "#F85888", "bug": "#A8B820", "rock": "#B8A038",
    "ghost": "#705898", "dragon": "#7038F8", "dark": "#705848", "steel": "#B8B8D0", "fairy": "#F0B6BC"
}

    return dictionaryTypes[type]
}



export default colorType