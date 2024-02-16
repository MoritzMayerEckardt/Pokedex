let currentPokemon;
let allPokemon = [];
let numberOfPokemon = 24;

async function loadPokemon() {
    let pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = '';
    for (let i = 1; i <= numberOfPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        if (response.ok) {
            currentPokemon = await response.json();
            allPokemon.push(currentPokemon);
            pokemonContainer.innerHTML += smallCardTemplate();
        } else {
            console.error(`Failed to fetch data for Pokemon ${i}: ${response.statusText}`)
        }
    }
}

function smallCardTemplate() {
    const type1 = currentPokemon.types[0].type.name;
    const type2 = currentPokemon.types[1] ? currentPokemon.types[1].type.name : null;

    return /*html*/`
    <div class="small-card">
        <div class="small-card-top">
            <h2>${currentPokemon.name}</h2> 
            <div>#${currentPokemon.id.toString().padStart(3, '0')}</div> 
        </div>
        <img class="small-img" src="${currentPokemon.sprites.front_shiny}" alt="${currentPokemon.name}">
        <div class="types">
            <div class="type">${type1}</div>
            ${type2 ? `<div class="type">${type2}</div>` : ''}
        </div>
    </div>
    `;
}










function renderPokemonInfo() {
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-img').src = currentPokemon['sprites']['front_shiny'];
    document.getElementById('pokemon-id').innerHTML += `#${currentPokemon['id'].toString().padStart(3, '0')}`;
    document.getElementById('pokemon-height').innerHTML += `<b>${currentPokemon['height']}</b>`;
    document.getElementById('pokemon-weight').innerHTML += `<b>${currentPokemon['weight']}</b>`;
}

function renderMoves() {
    let pokemonMoves = document.getElementById('pokemon-moves')
    let moves = currentPokemon['moves'];
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i]['move']; 
        pokemonMoves.innerHTML += `<li>${move['name']}</li>`;
    }
}

function renderIndices() {
    let pokemonIndices = document.getElementById('pokemon-index');
    let indices = currentPokemon['game_indices'];
    for (let i = 0; i < indices.length; i++) {
        const index = indices[i]['game_index'];
        const version = indices[i]['version']['name'];
        pokemonIndices.innerHTML += `<li>${index} ${version}</li>`;
    }  
}

