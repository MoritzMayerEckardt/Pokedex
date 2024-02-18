let currentPokemon;
let allPokemon = [];
let currentNumberOfPokemon = 0;

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        let card = document.getElementById('card');
        if (card.contains(event.target)) {
        } else {
            closePopup();
        }
    });
});

async function loadPokemon() {
    let pokemonContainer = document.getElementById('pokemon-container');
    let startIndex = currentNumberOfPokemon + 1;
    let endIndex = currentNumberOfPokemon + 42;
    for (let i = startIndex; i <= endIndex; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        if (response.ok) {
            currentPokemon = await response.json();
            allPokemon.push(currentPokemon);
            pokemonContainer.innerHTML += createSmallCardTemplate(currentPokemon);
        } else {
            console.error(`Failed to fetch data for Pokemon ${i}: ${response.statusText}`)
        }
    }
    currentNumberOfPokemon = endIndex;
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

function prepareTypesAndColors(pokemon) {
    let type1 = pokemon.types['0'].type.name;
    let type2 = pokemon.types['1'] ? pokemon.types['1'].type.name : null;
    let color1 = getBackgroundColor(type1);
    let color2 = type2 ? getBackgroundColor(type2) : null;
    return {type1, type2, color1, color2};
}

function openPopup(i, event) {
    let selectedPokemon = allPokemon[i];
    let card = document.getElementById('popup');
    removeDisplayNoneFromPopup();
    renderDetailedCard(i, selectedPokemon, card);
    increaseFontSizeAbout();
    avoidScolling();
    event.stopPropagation();
}

function removeDisplayNoneFromPopup() {
    let popup = document.getElementById('popup');
    popup.classList.remove('d-none');
}

function avoidScolling() {
    document.getElementById('mybody').classList.add('overflow-hidden');
}

function increaseFontSizeAbout() {
    document.getElementById('font-about').classList.add('increase-font-size');
}

function getBackGroundColorAndTypesCard(selectedPokemon) {
    let type1 = selectedPokemon.types['0'].type.name;
    let type2 = selectedPokemon.types['1'] ? selectedPokemon.types['1'].type.name : null;
    let color1 = getBackgroundColor(type1);
    let color2 = getBackgroundColor(type2);
    return {color1, color2, type1, type2}
}

function closePopup() {
    let popup = document.getElementById('popup');
    popup.classList.add('d-none');
    document.getElementById('mybody').classList.remove('overflow-hidden');
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
    let stats = allPokemon[i].stats;
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
    renderDetailedCard(nextPokemonIndex, nextPokemon);
    increaseFontSizeAbout();
    event.stopPropagation();
}

function showPreviousPokemon(i, event) {
    let numberOfPokemon = allPokemon.length;
    let previousPokemonIndex = (i - 1 + numberOfPokemon) % numberOfPokemon;
    let previousPokemon = allPokemon[previousPokemonIndex];
    renderDetailedCard(previousPokemonIndex, previousPokemon);
    increaseFontSizeAbout();
    event.stopPropagation();
}

function searchPokemon() {
    let search = document.getElementById('search').value.toLowerCase();
    let pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = '';
    for (let index = 0; index < allPokemon.length; index++) {
        let name = allPokemon[index].forms[0].name.toLowerCase();
        if (name.toLowerCase().includes(search) || search === "") {
            pokemonContainer.innerHTML += createSmallCardTemplate(allPokemon[index]);
        }
    }
}

async function loadMorePokemon() {
    await loadPokemon();
}

function clearSearch() {
    document.getElementById('search').value = ''; 
    searchPokemon();
}






