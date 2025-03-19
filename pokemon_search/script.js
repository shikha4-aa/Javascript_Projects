const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const sprite = document.getElementById('sprite');
const stats = {
    hp: document.getElementById('hp'),
    attack: document.getElementById('attack'),
    defense: document.getElementById('defense'),
    'special-attack': document.getElementById('special-attack'),
    'special-defense': document.getElementById('special-defense'),
    speed: document.getElementById('speed')
};

async function searchPokemon() {
    const search = searchInput.value.toLowerCase().trim();
    if (!search) return;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const data = await response.json();
        displayPokemonInfo(data);
    } catch (error) {
        alert('Pokémon not found');
        clearPokemonInfo();
    }
}

function displayPokemonInfo(pokemon) {
    // Clear previous data
    clearPokemonInfo();

    // Display basic info
    pokemonName.textContent = pokemon.name.toUpperCase();
    pokemonId.textContent = `#${pokemon.id}`;
    weight.textContent = `Weight: ${pokemon.weight}`;
    height.textContent = `Height: ${pokemon.height}`;

    // Display sprite
    sprite.src = pokemon.sprites.front_default;
    sprite.hidden = false;

    // Display types
    pokemon.types.forEach(type => {
        const typeSpan = document.createElement('span');
        typeSpan.textContent = type.type.name.toUpperCase();
        types.appendChild(typeSpan);
    });

    // Display stats
    pokemon.stats.forEach(stat => {
        const statElement = stats[stat.stat.name];
        if (statElement) {
            statElement.textContent = stat.base_stat;
        }
    });
}

function clearPokemonInfo() {
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    types.innerHTML = '';
    sprite.hidden = true;
    sprite.src = '';
    
    Object.values(stats).forEach(stat => {
        stat.textContent = '';
    });
}

searchButton.addEventListener('click', searchPokemon);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});