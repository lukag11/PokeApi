// ! Traemos todos los elementos del html

const form = document.getElementById('form');
const pokemonInput = document.querySelector('.input-number');
const cardContainer = document.querySelector('.result-pokemon');


// GUARDAMOS EL ARRAY DE LOS POKEMONES

//   let pokemonesArr =  JSON.parse(localStorage.getItem('pokemones')) || [];
  let pokemonesArr =  [];

// Funcion para guardar en el local storage

// const saveLocalStorage = (pokemonlist) =>{
//     localStorage.setItem('pokemones' , JSON.stringify(pokemonlist));
// };

// Funcion para calcular la altura

const convertHeight = valueHeight => {
    let height = valueHeight / 10;
    return height;
}

// Funcion para calcular el peso

const convertWeight = valueWeight =>{
    let weight = valueWeight /10;
    return weight;
}

/* Función para mostrar un error en caso de que no hayamos colocado nada en el input y activemos el evento submit */
const showEmptyError = () => {
  cardContainer.innerHTML = `
    <div class="result-list">
   <img src="./img/error.png" alt="" class="img-pokemon">
    <h2 class="error-title"> Por favor, ingrese un número para que podamos buscar su pokemon en el menú. </h2>
    </div>`;
};




//! Funcion para renderizar HTML

const renderPokemon = pokemon =>{
    const  {types} =pokemon;
    return `
    <div class="container-info">
                <label>Nombre: ${pokemon.name}</label>
                <label>Tipo Principal:</label>    
                ${types.map(tipo => {
                    return `<label class="${tipo.type.name}">${tipo.type.name}</label>`
                })}
               
                <label>Altura: ${convertHeight(pokemon.height)}M</label>
                <label>Peso: ${convertWeight(pokemon.weight)}.KG</label>

     </div>
                <div class="container-img">
            <img src="${pokemon.sprites.other.home.front_default}" alt="" class="img-pokemon">
            </div>
    `
    // sprites.other.home.front_default 
    // <label >Tipo Principal: ${pokemon.types[0].type.name}</label>

    
};


//! Funcion para la logica de renderizado

const renderPokemonList = pokemonListRender =>{

    cardContainer.innerHTML = pokemonesArr.map(pokemon => renderPokemon(pokemon)).join('');
}






// FUNCION PARA BUSCAR POKEMON

const searchPokemon = async e =>{
    e.preventDefault();
    // Capturamos el valor del input

    const searchedPokemon = pokemonInput.value.trim();

    if (!searchedPokemon) {
    showEmptyError(searchedPokemon);
    return;
    }


    // VAMOS A PASARLE EL VALOR DEL INPUT AL REQUEST pokemonInput

    const fetchedPokemon = await requestPokemon(searchedPokemon);
    

    // - VERIFICAR MENSAJE POR SI NO SE ENCUENTRA EL POKEMON

//      if (!fetchedPokemon.id) {
//    cardContainer.innerHTML = 
//    `  <div class="result-list">
//    <img src="./img/error.png" alt="" class="img-pokemon">
//    <h2 class="error-title"> Por favor ingrese otro id porque el pokemon es inexistente</h2>
//      </div>`;
//     form.reset();
//      return;
//    } 
  

  

    // PROBAR SI FUNCIONA
    //  console.log(fetchedPokemon);

    // LINEA (TRANSFORMAR ARRAY EN LO QUE NO ESTE DEVOLVIENDO Y LE HACEMOS UNA COPIA ...)
    // pokemonesArr = [fetchedPokemon, ...pokemonesArr];
   
   // LINEA (TRANSFORMAR ARRAY EN LO QUE NO ESTE DEVOLVIENDO

   
    pokemonesArr = [fetchedPokemon];

     renderPokemonList(pokemonesArr);
    //PARA GUARDAR EN EL LOCALSTORAGE
    //  saveLocalStorage(pokemonesArr);
    form.reset();
    

    

};



// ! FUNCION GENERAL PARA LLAMAR A TODO
const init = () => {
    form.addEventListener('submit' , searchPokemon);
   
};
init();