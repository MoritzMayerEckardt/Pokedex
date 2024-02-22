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

function prepareTypesAndColors(currentPokemon) {
    let type1 = currentPokemon.types['0'].type.name;
    let type2 = currentPokemon.types['1'] ? currentPokemon.types['1'].type.name : null;
    let color1 = getBackgroundColor(type1);
    let color2 = type2 ? getBackgroundColor(type2) : null;
    return {type1, type2, color1, color2};
}

function getBackGroundColorAndTypesCard(selectedPokemon) {
    let type1 = selectedPokemon.types['0'].type.name;
    let type2 = selectedPokemon.types['1'] ? selectedPokemon.types['1'].type.name : null;
    let color1 = getBackgroundColor(type1);
    let color2 = getBackgroundColor(type2);
    return {color1, color2, type1, type2}
}

function removeDisplayNoneFromPopup() {
    let popup = document.getElementById('popup');
    popup.classList.remove('d-none');
}

function increaseFontSizeAbout() {
    document.getElementById('font-about').classList.add('increase-font-size');
}

function changeToAboutContainer(aboutContainer) {
    aboutContainer.innerHTML = '';
    aboutContainer.classList.remove('moves');
    aboutContainer.classList.remove('stats');
    aboutContainer.classList.add('about');
}

function avoidScolling() {
    document.getElementById('mybody').classList.add('overflow-hidden');
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

function removeDisplayNoneFromLoading() {
    let loadingScreen = document.getElementById('loading')
    loadingScreen.classList.remove('d-none');
}

function showLoadingScreen() {
    let loadingScreen = document.getElementById('loading');
    loadingScreen.innerHTML = '';
    loadingScreen.innerHTML = renderLoadingScreen();
}
