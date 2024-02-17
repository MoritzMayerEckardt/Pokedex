let currentPokemon;
let allPokemon = [];
let numberOfPokemon = 42;

async function loadPokemon() {
    let pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = '';
    for (let i = 1; i <= numberOfPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        if (response.ok) {
            currentPokemon = await response.json();
            allPokemon.push(currentPokemon);
            pokemonContainer.innerHTML += createSmallCardTemplate(i);
        } else {
            console.error(`Failed to fetch data for Pokemon ${i}: ${response.statusText}`)
        }
    }
}

function getBackgroundColor(type) {
    switch (type) {
        case 'grass':
            return '#7AC74C';
        case 'fire':
            return '#EE8130';
        case 'water':
            return '#6390F0';
        case 'normal':
            return '#A8A77A';
        case 'flying':
            return '#A98FF3';
        case 'bug':
            return '#A6B91A';
        case 'poison':
            return '#A33EA1';
        case 'electric':
            return '#F7D02C';
        case 'ground':
            return '#E2BF65';
        case 'fairy':
            return '#D685AD';
        case 'fighting':
            return '#C22E28'
        case 'psychic':
            return '#F95587';
        case 'rock':
            return '#B6A136';
        case 'ghost':
            return '#735797';
        case 'ice':
            return '#96D9D6';
        case 'dragon':
            return '#6F35FC';
        case 'dark':
            return '#705746';
        case 'steel':
            return '#B7B7CE';
        default:
            return 'black';
    }
}

function prepareTypesAndColors() {
    let type1 = currentPokemon.types[0].type.name;
    let type2 = currentPokemon.types[1] ? currentPokemon.types[1].type.name : null;
    let color1 = getBackgroundColor(type1);
    let color2 = type2 ? getBackgroundColor(type2) : null;
    return {type1, type2, color1, color2}
}

function createSmallCardTemplate(i) {
    let { type1, type2, color1, color2 } = prepareTypesAndColors();
    return /*html*/`
        <div onclick="openPopup(${i})" class="small-card" style="background-color: ${color1};">
            <div class="small-card-top">
                <h2>${currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}</h2> 
                <div>#${currentPokemon.id.toString().padStart(3, '0')}</div> 
            </div>
            <div class="types">
                <div class="type" style="background-color: ${color1};">${type1}</div>
                ${type2 ? `<div class="type" style="background-color: ${color2};">${type2}</div>` : ''}
            </div>
            <img class="small-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i}.png" alt="${currentPokemon.name}">
            <div class="small-card-bottom"></div>
        </div>
    `;
}

function openPopup(i) {
    let popup = document.getElementById('popup');
    let selectedPokemon = allPokemon[i-1];
    popup.classList.remove('d-none');
    renderDetailedCard(i, selectedPokemon);
    renderPokemonInfo(selectedPokemon);
}

function renderDetailedCard(i, selectedPokemon) {
    let card = document.getElementById('card');
    card.innerHTML = /*html*/`
        <div class="card">
            <div class="pokedex-top">
                <div class="pokemon-headline">
                    <h1 id="pokemon-name"></h1>
                    <div id="pokemon-id"></div>
                </div>
                <img id="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i}.png" alt="">
            </div>
            <div class="info">
                <div class="height-and-weight">
                    <div class="height"><span class="color">Height</span><div id="pokemon-height"></div></div>
                    <div class="weight"><span class="color">Weight</span><div id="pokemon-weight"></div></div>
                </div>
                <div class="moves-and-index">
                    <ul id="pokemon-moves">Moves:</ul>
                    <ul id="pokemon-index">Index:</ul>
                </div>
            </div>
        </div>
    `;
    renderPokemonInfo(selectedPokemon);
}

function renderPokemonInfo(selectedPokemon) {
    document.getElementById('pokemon-name').innerHTML = selectedPokemon['name'];
    document.getElementById('pokemon-id').innerHTML += `#${selectedPokemon['id'].toString().padStart(3, '0')}`;
    document.getElementById('pokemon-height').innerHTML += `<b>${selectedPokemon['height']}</b>`;
    document.getElementById('pokemon-weight').innerHTML += `<b>${selectedPokemon['weight']}</b>`;
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

