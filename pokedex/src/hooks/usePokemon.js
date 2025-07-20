import { useEffect, useState } from 'react';

// en la url, se limita a 20 el numero maximo de obtencion de pokemones (limit) y parte del indice 0 (offset)
const URL_API = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;
// url utilizada para realizar búsquedas de pokemones
const URL_API_SEARCH = `https://pokeapi.co/api/v2/pokemon/`;


export const usePokemon = () => {

    // Estado para manejar el estado donde se guardarán en un Listado los pokemones
    const [pokemones, setPokemones] = useState([]);
    // Estado para proporcionar la siguiente url que contiene los siguientes 20 pokemones
    const [nextURL, setNextURL] = useState('');
    // Estado para saber cuando detener el mostrado de pokemones cuando seeMore sea igual a null
    const [seeMore, setSeeMore] = useState(true);

    // Función para obtener por fetch los pokemones y su información (se usa aqui en getPokemones() y searchPokemones(), no se exporta)
    const getByApiFetchInfoPokemones = async(url) => {
        // Para cada pokemon, accedemos a su atributo url
        const responseForEachPokemon = await fetch(url);
        // Obtener la información para cada uno de los 20 pokemones
        const pokeInfoUrl = await responseForEachPokemon.json();

        // Obtención de información estadística para cada pokémon
        // Obtener arreglos con las habilidades (abilities) del pokémon
        const abilities = pokeInfoUrl.abilities.map(elementoAbility => elementoAbility.ability.name);
        // Obtener los tipos (types) 
        const types = pokeInfoUrl.types.map(elementoType => elementoType.type.name);
        // Obtener especies (species)
        const species = pokeInfoUrl.species.name;
        // Obtener Altura (height)
        const height = pokeInfoUrl.height;
        // Obtener Peso (weight)
        const weight = pokeInfoUrl.weight;

        // Obtener estadisticas (stats) para cada pokémon
        // const stats = pokeInfoUrl.stats.map((s) => {
        //     return {
        //         name: s.stat.name,
        //         base: s.base_stat
        //     }
        // });

        // Se devuelve un objeto con las propiedades de interés de cada uno de los 20 pokemones
        return {
            id: pokeInfoUrl.id,
            name: pokeInfoUrl.name,
            image: pokeInfoUrl.sprites.other.dream_world.front_default,
            abilities,
            types,
            species,
            height,
            weight
        }
    }

    // Obtención de la data para cada pokémon
    // Si url_API no tiene otro dato, por defecto tendrá la URL_API de arriba
    const getPokemones = async (urlAPI = URL_API) => {

        const response = await fetch(urlAPI);
        // Obtener la data o l alista de pokemones
        const data = await response.json();
        // Desestructurar data, ya que contiene el atributo results el cual tiene a nuestro arreglo de los 20 pokemones
        // next es una propiedad que permitirá recuperar los siguientes 20 pokémons
        const { next, results } = data;

        // Obtener datos para cada pokemon: nombre y url
        // Resolver las promesas con Promise.all que contiene nuestra funcion como retorno de dataForEachPokemon
        const dataForEachPokemon = await Promise.all(
            results.map( (pokemon) => getByApiFetchInfoPokemones(pokemon.url) )
        );

        // regresará un objeto con next que son los siguientes 20 pokémons y la data de cada pokémon
        return { next, dataForEachPokemon }
        // Se "setean" en setPokemones, de nuestro arreglo pokemones
        // setPokemones(dataForEachPokemon);
    }

    // Obtención de la url y data para la carga inicial de 20 pokémones y los siguientes 20 pokémones
    const getNextTwentyPokemones = async () => {
        const { next, dataForEachPokemon } = await getPokemones();
        setPokemones(dataForEachPokemon);
        // Para visualizar los siguientes 20 pokémons
        setNextURL(next);
    }

    // Agregar los siguientes 20 pokemones al arreglo pokémones
    const addNextTwentyPokemons = async () => {
        const { next, dataForEachPokemon } = await getPokemones(nextURL);
        // En el estado previo del arreglo que contiene los pokemones, se agregan los nuevos 20 pokemones
        setPokemones((previewStateOfArrayPokemones) => [...previewStateOfArrayPokemones, ...dataForEachPokemon]);
        // next nos regresa la siguiente url a ser llamada, donde se agregan los nuevos 20 pokemones
        // si next == null es porque ya no contiene mas pokemones, por lo que setSeeMore le actualizamos el estado a false 
        next == null && setSeeMore(false);
        setNextURL(next);
    }

    // Realizar búsqueda de pokemones. pokemonWordEnteredInInput viene del input y es nuestra variable de estado del Buscador
    const searchPokemon = async (pokemonWordEnteredInInput) => {
        // Concatena la url de nuestra busqueda, con la palabra que se ingresa en el input del pokemon a buscar
        const urlSearchPokemon = `${URL_API_SEARCH}${pokemonWordEnteredInInput.toLocaleLowerCase()}`;
        return await getByApiFetchInfoPokemones(urlSearchPokemon);
    }

    // Con useEffect se maneja la lógica para poder realizar peticiones a nuestra api, el arreglo de dependencias se deja vacio
    // para que se ejecute el use effect una vez despues del renderizado
    useEffect(() => {
        //getPokemones();
        // Para obtener los 20 siguientes pokemones
        getNextTwentyPokemones();
    }, []);

    return (
        { pokemones, addNextTwentyPokemons, seeMore, searchPokemon }
    )
}
