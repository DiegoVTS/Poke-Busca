const form = document.getElementById("form-buscar")
const input = document.getElementById("name")
const erro = document.getElementById("erro")
const lista = document.getElementById("ultimos5")
const stats = document.getElementById("stats")
const img = document.querySelector("#info-poke img")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const pokemon = input.value.toLowerCase().trim()
    buscarPokemon(pokemon)
    input.value = ""
})

async function buscarPokemon(nome) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        const data = await response.json()

        // esconde o erro se estava aparecendo
        erro.hidden = true

        // pega as infos
        const nomePoke = data.name
        const hp = data.stats[0].base_stat
        const tipo = data.types[0].type.name
        const imagem = data.sprites.front_default

        // mostra a imagem
        img.src = imagem
        img.style.display = "block"
        img.alt = nomePoke

        

        // mostra os stats
        stats.innerHTML = `
            <li>Nome: ${nomePoke}</li>
            <li>HP: ${hp}</li>
            <li>Tipo: ${tipo}</li>
        `

        // adiciona na lista dos últimos buscados
        adicionarNaLista(nomePoke)

    } catch (error) {
        erro.hidden = false
    }
}

const ultimosBuscados = []

function adicionarNaLista(nome) {
    // adiciona no início do array
    ultimosBuscados.unshift(nome)

    // mantém só os últimos 5
    if (ultimosBuscados.length > 5) {
        ultimosBuscados.pop()
    }

    // limpa a lista atual
    lista.innerHTML = ""

    // renderiza os itens
    ultimosBuscados.forEach(pokemon => {
        const item = document.createElement("li")
        item.textContent = pokemon
        lista.appendChild(item)
    })
}