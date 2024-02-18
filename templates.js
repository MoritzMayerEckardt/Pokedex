
function createSmallCardTemplate(pokemon) {
    let { type1, type2, color1, color2 } = prepareTypesAndColors(pokemon);
    return /*html*/`
        <div onclick="openPopup(${pokemon.id - 1}, event)" class="small-card" style="background-color: ${color1};">
            <div class="small-card-top">
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2> 
                <div>#${pokemon.id.toString().padStart(3, '0')}</div> 
            </div>
            <div class="types">
                <div class="type" style="background-color: ${color1};">${type1}</div>
                ${type2 ? `<div class="type" style="background-color: ${color2};">${type2}</div>` : ''}
            </div>
            <img class="small-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png" alt="${pokemon.name}">
            <div class="small-card-bottom"></div>
        </div>
    `;
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
                <div class="image">
                    <b class="close-button" style="color:${color1}" onclick="closePopup()">x</b>
                    <b class="next-previous" style="color:${color1}" onclick="showPreviousPokemon(${i}, event)"><</b>
                    <img id="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i+1}.png" alt="">
                    <b class="next-previous" style="color:${color1}" onclick="showNextPokemon(${i}, event)">></b>
                </div>
            <div class="info" style="background-color: ${color1}">
                <div class="about-stats-moves">
                    <b onclick="showAbout(${i}, event)" id="font-about" class="category">About</b>
                    <b onclick="showStats(${i})" id="stats" class="category">Stats</b>
                    <b onclick="showMoves(${i})" id="moves" class="category">Moves</b>
                </div>
                <div id="about" class="about">
                    <div class="skill">
                        <span>base-experience</span>
                        <div><b>${selectedPokemon.base_experience}</b></div>
                    </div>
                    <div class="skill">
                        <span>height</span>
                        <div><b>${selectedPokemon.height}</b></div>
                    </div>
                    <div class="skill">
                        <span>weight</span>
                        <div><b>${selectedPokemon.weight}</b></div>
                    </div>
                    <div class="skill">
                        <span>abilities</span>
                        <div class="abilities">
                            <b>${selectedPokemon.abilities['0'].ability.name}</b>
                            ${selectedPokemon.abilities.length > 1 ? `<b>${selectedPokemon.abilities['1'].ability.name}</b>` : ''}
                            ${selectedPokemon.abilities.length > 2 ? `<b>${selectedPokemon.abilities['2'].ability.name}</b>` : ''}
                        </div>
                    </div>
                    <div class="types-detailed-card">
                    <b class="type-detailed-card" style="background-color: ${color1}">${type1}</b>   
                    ${selectedPokemon.types.length > 1 ? `<b class="type-detailed-card" style="background-color: ${color2}">${type2}</b>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderMoves(moves, movesContainer) {
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i].move; 
        movesContainer.innerHTML += `<b class="move">${move.name}</b>`;
    }
}

function renderStats(stats) {
    return /*html*/`
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