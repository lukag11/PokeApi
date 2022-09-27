const requestPokemon = async (pokemonID) => {

    const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;

    // const query = `?q=${pokemon}`;

    const response = await fetch(baseURL);

    const data = await response.json();

    //  console.log(data);

    return data;
};

//  requestPokemon('100');