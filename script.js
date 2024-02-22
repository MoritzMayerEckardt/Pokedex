let currentPokemon;
let allPokemon = [];
let currentPokemonIndex = 0;
const POKEMON_PER_PAGE = 42;

async function init() {
    let pokemonContainer = document.getElementById('pokemon-container');
    let startIndex = currentPokemonIndex + 1;
    let endIndex = currentPokemonIndex + POKEMON_PER_PAGE;
    openLoadingScreen();
    await loadPokemon(pokemonContainer, startIndex, endIndex);
    closeLoadingScreen();
    currentPokemonIndex = endIndex;
}

async function loadPokemon(pokemonContainer, startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        if (response.ok) {
            currentPokemon = await response.json();
            allPokemon.push(currentPokemon);
            let { type1, type2, color1, color2 } = prepareTypesAndColors(currentPokemon);
            pokemonContainer.innerHTML += createSmallCardTemplate(currentPokemon, type1, type2, color1, color2 );
        } else {
            console.error(`Failed to fetch data for Pokemon ${i}: ${response.statusText}`)
        }
    }
}

function openPopup(i, event) {
    let selectedPokemon = allPokemon[i];
    removeDisplayNoneFromPopup();
    showCard(i, selectedPokemon);
    increaseFontSizeAbout();
    avoidScolling();
    event.stopPropagation();
}

function showCard(i, selectedPokemon) {
    let {color1, color2, type1, type2} = getBackGroundColorAndTypesCard(selectedPokemon);
    let card = document.getElementById('popup');
    card.innerHTML = '';
    card.innerHTML += renderDetailedCard(i, selectedPokemon, color1, color2, type1, type2);
}

function showMoves(i) {
    let movesContainer = document.getElementById('about');
    let moves =  allPokemon[i].moves;
    increaseFontSizeMoves();
    changeToMovesContainer(movesContainer);
    renderMoves(moves, movesContainer);
}

function renderMoves(moves, movesContainer) {
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i].move; 
        movesContainer.innerHTML += `<b class="move">${move.name}</b>`;
    }
}

function showAbout(i, event) {
    let aboutContainer = document.getElementById('about');
    changeToAboutContainer(aboutContainer);
    event.stopPropagation();
    openPopup(i, event);
}

function showStats(i) {
    let statsContainer = document.getElementById('about');
    let stats = allPokemon[i].stats;
    increaseFontSizeStats();
    changeToStatsContainer(statsContainer, stats);
}

function showNextPokemon(i, event) {
    let numberOfPokemon = allPokemon.length;
    let nextPokemonIndex = (i + 1) % numberOfPokemon;
    let nextPokemon = allPokemon[nextPokemonIndex]
    showCard(nextPokemonIndex, nextPokemon);
    increaseFontSizeAbout();
    event.stopPropagation();
}

function showPreviousPokemon(i, event) {
    let numberOfPokemon = allPokemon.length;
    let previousPokemonIndex = (i - 1 + numberOfPokemon) % numberOfPokemon;
    let previousPokemon = allPokemon[previousPokemonIndex];
    showCard(previousPokemonIndex, previousPokemon);
    increaseFontSizeAbout();
    event.stopPropagation();
}

function closePopup() {
    let popup = document.getElementById('popup');
    popup.classList.add('d-none');
    document.getElementById('mybody').classList.remove('overflow-hidden');
}

function searchPokemon() {
    let search = document.getElementById('search').value.toLowerCase();
    let pokemonContainer = document.getElementById('pokemon-container');
    showSearchResult(search, pokemonContainer);
}

function showSearchResult(search, pokemonContainer) {
    pokemonContainer.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        let name = allPokemon[i].name.toLowerCase();
        if (name.includes(search)) {
            let { type1, type2, color1, color2 } = prepareTypesAndColors(allPokemon[i]);
            pokemonContainer.innerHTML += createSmallCardTemplate(allPokemon[i], type1, type2, color1, color2);
        } 
    }
}

function clearSearch() {
    document.getElementById('search').value = ''; 
    searchPokemon();
}

async function loadMorePokemon() {
    let pokemonContainer = document.getElementById('pokemon-container');
    let startIndex = currentPokemonIndex + 1;
    let endIndex = currentPokemonIndex + POKEMON_PER_PAGE;
    openLoadingScreen();
    await loadPokemon(pokemonContainer, startIndex, endIndex);
    closeLoadingScreen();
    currentPokemonIndex = endIndex;
}

function openLoadingScreen() {
    removeDisplayNoneFromLoading();
    avoidScolling();
    showLoadingScreen();
}

function closeLoadingScreen() {
    document.getElementById('loading').classList.add('d-none');
    document.getElementById('mybody').classList.remove('overflow-hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        let card = document.getElementById('card');
        if (card && card.contains(event.target)) {
        } else {
            closePopup();
        }
    });
});



