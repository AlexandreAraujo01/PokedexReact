import requests




res = requests.get("https://pokeapi.co/api/v2/evolution-chain/2/")

data = res.json()

evolucoes = data['chain']['evolves_to']  # Obtém a lista de evoluções

# Agora, você pode acessar as informações de cada evolução individualmente, por exemplo:
# primeira_evolucao = evolucoes[0]
# segunda_evolucao = primeira_evolucao['evolves_to'][0]
# terceira_evolucao = segunda_evolucao['evolves_to']

# # Para obter o nome das espécies nas evoluções, você pode fazer o seguinte:
# nome_primeira_evolucao = primeira_evolucao['species']['name']
# nome_segunda_evolucao = segunda_evolucao['species']['name']

# print("Primeira Evolução:", nome_primeira_evolucao)
# print("Segunda Evolução:", nome_segunda_evolucao)
# print(terceira_evolucao)

def GetEvolutions(data):
    array = []
    pokemon = data['chain']['evolves_to']
    while True:
        if len(pokemon) < 1:
            break
        else:
            p_name = pokemon[0]['species']['name']
            print(pokemon[0])
            array.append(p_name)
            pokemon = pokemon[0]['evolves_to']
            
    print(array)

   



GetEvolutions(data)
