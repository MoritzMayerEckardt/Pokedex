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
    let type1 = currentPokemon.types['0'].type.name;
    let type2 = currentPokemon.types['1'] ? currentPokemon.types['1'].type.name : null;
    let color1 = getBackgroundColor(type1);
    let color2 = type2 ? getBackgroundColor(type2) : null;
    return {type1, type2, color1, color2}
}

function createSmallCardTemplate(i) {
    let { type1, type2, color1, color2 } = prepareTypesAndColors();
    return /*html*/`
        <div onclick="openPopup(${i-1})" class="small-card" style="background-color: ${color1};">
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
    let selectedPokemon = allPokemon[i];
    popup.classList.remove('d-none');
    renderDetailedCard(i, selectedPokemon);
}

function getBackGroundColorAndTypesCard(selectedPokemon) {
    let type1 = selectedPokemon.types['0'].type.name;
    let type2 = selectedPokemon.types['1'] ? selectedPokemon.types['1'].type.name : null;
    let color1 = getBackgroundColor(type1);
    let color2 = getBackgroundColor(type2);
    return {color1, color2, type1, type2}
}

function renderDetailedCard(i, selectedPokemon) {
    let {color1, color2, type1, type2} = getBackGroundColorAndTypesCard(selectedPokemon);
    let card = document.getElementById('popup');
    card.innerHTML = /*html*/`
        <div id="card">
                <div class="pokemon-headline" style="color: ${color1}">
                    <h2 id="pokemon-name">${selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h2>
                    <div id="pokemon-id">#${selectedPokemon.id.toString().padStart(3, '0')}</div>
                </div>
                <img id="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i+1}.png" alt="">
            <div class="info" style="background-color: ${color1}">
                <div class="about-stats-moves">
                    <b onclick="showAbout(${i})" class="category">About</b>
                    <b onclick="showStats(${i})" class="category">Stats</b>
                    <b onclick="showMoves(${i})" class="category">Moves</b>
                </div>
                <div id="about" class="about">
                    <div class="skill">
                        <span>Base Experience</span>
                        <div><b>${selectedPokemon.base_experience}</b></div>
                    </div>
                    <div class="skill">
                        <span>Height</span>
                        <div><b>${selectedPokemon.height}</b></div>
                    </div>
                    <div class="skill">
                        <span>Weight</span>
                        <div><b>${selectedPokemon.weight}</b></div>
                    </div>
                    <div class="skill">
                        <span>Abilities</span>
                        <div class="abilities">
                            <b>${selectedPokemon.abilities['0'].ability.name}</b>
                            ${selectedPokemon.abilities.length > 1 ? `<b>${selectedPokemon.abilities['1'].ability.name}</b>` : ''}
                        </div>
                    </div>
                    <div class="types-detailed-card">
                    <b class="type-detailed-card" style="background-color: ${color1}">${type1}</b>   
                    ${selectedPokemon.types.length > 1 ? `<b class="type-detailed-card" style="background-color: ${color2}">${type2}</b>` : ''}
                    </div>
                    <div class="close-button" onclick="closePopup()">x</div>
                </div>
            </div>
        </div>
    `;
}

function closePopup() {
    let popup = document.getElementById('popup');
    popup.classList.add('d-none');
}

function showMoves(i) {
    let movesContainer = document.getElementById('about');
    movesContainer.innerHTML = '';
    movesContainer.classList.remove('about');
    movesContainer.classList.remove('stats');
    movesContainer.classList.add('moves');
    let moves =  allPokemon[i].moves;
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i].move; 
        movesContainer.innerHTML += `<b class="move">${move.name}</b>`;
    }
}

function showAbout(i) {
    let aboutContainer = document.getElementById('about');
    aboutContainer.innerHTML = '';
    aboutContainer.classList.remove('moves');
    aboutContainer.classList.remove('stats');
    aboutContainer.classList.add('about');
    openPopup(i);
}

function showStats(i) {
    let statsContainer = document.getElementById('about');
    statsContainer.innerHTML = '';
    statsContainer.classList.remove('moves');
    statsContainer.classList.remove('about');
    statsContainer.classList.add('stats');
    statsContainer.innerHTML = renderStats(i, statsContainer);
    let stats = allPokemon[i].stats;
}

function renderStats(i, statsContainer) {
    let stats = allPokemon[i].stats;
    return statsContainer.innerHTML += /*html*/`
    <div class="stats-name">
        <span>${stats[0].stat.name}</span>
        <span>${stats[1].stat.name}</span>
        <span>${stats[2].stat.name}</span>
        <span>${stats[3].stat.name}</span>
        <span>${stats[4].stat.name}</span>
        <span>${stats[5].stat.name}</span>
    </div>
    <div class="stats-chart">
        <div class="bar" style="width: ${stats[0].base_stat}px;"></div>
        <div class="bar" style="width: ${stats[1].base_stat}px;"></div>
        <div class="bar" style="width: ${stats[2].base_stat}px;"></div>
        <div class="bar" style="width: ${stats[3].base_stat}px;"></div>
        <div class="bar" style="width: ${stats[4].base_stat}px;"></div>
        <div class="bar" style="width: ${stats[5].base_stat}px;"></div>
    </div>
    <div class="stats-value">
        <b>${stats[0].base_stat}</b>
        <b>${stats[1].base_stat}</b>
        <b>${stats[2].base_stat}</b>
        <b>${stats[3].base_stat}</b>
        <b>${stats[4].base_stat}</b>
        <b>${stats[5].base_stat}</b>
    </div>
`;
}



