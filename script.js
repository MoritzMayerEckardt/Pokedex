let currentPokemon;
let allPokemon = [];
let currentPokemonIndex = 0;
const POKEMON_PER_PAGE = 42;

function init() {
    let pokemonContainer = document.getElementById('pokemon-container');
    let startIndex = currentPokemonIndex + 1;
    let endIndex = currentPokemonIndex + POKEMON_PER_PAGE;
    loadPokemon(pokemonContainer, startIndex, endIndex);
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

function prepareTypesAndColors(currentPokemon) {
    let type1 = currentPokemon.types['0'].type.name;
    let type2 = currentPokemon.types['1'] ? currentPokemon.types['1'].type.name : null;
    let color1 = getBackgroundColor(type1);
    let color2 = type2 ? getBackgroundColor(type2) : null;
    return {type1, type2, color1, color2};
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

function openPopup(i, event) {
    let selectedPokemon = allPokemon[i];
    removeDisplayNoneFromPopup();
    showCard(i, selectedPokemon);
    increaseFontSizeAbout();
    avoidScolling();
    event.stopPropagation();
}

function removeDisplayNoneFromPopup() {
    let popup = document.getElementById('popup');
    popup.classList.remove('d-none');
}

function showCard(i, selectedPokemon) {
    let {color1, color2, type1, type2} = getBackGroundColorAndTypesCard(selectedPokemon);
    let card = document.getElementById('popup');
    card.innerHTML = '';
    card.innerHTML += renderDetailedCard(i, selectedPokemon, color1, color2, type1, type2);
}

function getBackGroundColorAndTypesCard(selectedPokemon) {
    let type1 = selectedPokemon.types['0'].type.name;
    let type2 = selectedPokemon.types['1'] ? selectedPokemon.types['1'].type.name : null;
    let color1 = getBackgroundColor(type1);
    let color2 = getBackgroundColor(type2);
    return {color1, color2, type1, type2}
}

function increaseFontSizeAbout() {
    document.getElementById('font-about').classList.add('increase-font-size');
}

function avoidScolling() {
    document.getElementById('mybody').classList.add('overflow-hidden');
}

function showMoves(i) {
    let movesContainer = document.getElementById('about');
    let moves =  allPokemon[i].moves;
    increaseFontSizeMoves();
    changeToMovesContainer(movesContainer);
    renderMoves(moves, movesContainer);
}

function increaseFontSizeMoves() {
    document.getElementById('stats').classList.remove('increase-font-size');
    document.getElementById('font-about').classList.remove('increase-font-size');
    document.getElementById('moves').classList.add('increase-font-size');
}

function changeToMovesContainer(movesContainer) {
    movesContainer.innerHTML = '';
    movesContainer.classList.remove('about');
    movesContainer.classList.remove('stats');
    movesContainer.classList.add('moves');
}

function showAbout(i, event) {
    let aboutContainer = document.getElementById('about');
    changeToAboutContainer(aboutContainer);
    event.stopPropagation();
    openPopup(i, event);
}

function changeToAboutContainer(aboutContainer) {
    aboutContainer.innerHTML = '';
    aboutContainer.classList.remove('moves');
    aboutContainer.classList.remove('stats');
    aboutContainer.classList.add('about');
}

function showStats(i) {
    let statsContainer = document.getElementById('about');
    let stats = (allPokemon[i].stats);
    increaseFontSizeStats();
    changeToStatsContainer(statsContainer, stats);
}

function increaseFontSizeStats() {
    document.getElementById('stats').classList.add('increase-font-size');
    document.getElementById('moves').classList.remove('increase-font-size');
    document.getElementById('font-about').classList.remove('increase-font-size');
}

function changeToStatsContainer(statsContainer, stats) {
    statsContainer.innerHTML = '';
    statsContainer.classList.remove('moves');
    statsContainer.classList.remove('about');
    statsContainer.classList.add('stats');
    statsContainer.innerHTML = renderStats(stats);
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

function loadMorePokemon() {
    let pokemonContainer = document.getElementById('pokemon-container');
    let startIndex = currentPokemonIndex + 1;
    let endIndex = currentPokemonIndex + POKEMON_PER_PAGE;
    loadPokemon(pokemonContainer, startIndex, endIndex);
    currentPokemonIndex = endIndex;
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




