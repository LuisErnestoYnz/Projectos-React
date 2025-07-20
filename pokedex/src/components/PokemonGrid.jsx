import { PokemonItem } from './PokemonItem';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonStadistics } from './PokemonStadistics';
import { Search } from './Search';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './PokemonGrid.css';

// Componente que maneja la obtención del listado de pokemones a través de la API
export const PokemonGrid = () => {

    // Se usará el custom hook de usePokemon
    // Pokemones es nuestro arreglo de pokemones, mientras que addNextTwentyPokemons es la función que wnos permite visualizar os siguientes 20 pokemones a los actuales
    const { pokemones, addNextTwentyPokemons, seeMore, searchPokemon } = usePokemon();

    // objeto pokemon guarda la info del pokemon que vamos a mostrar su informacion
    const [showInfoPokemon, setShowInfoPokemon] = useState({ showInfoPokemon: false, pokemon: {} });

    // Temporal. rebibe pokemon, actualizamos variable de estado y agregamos el pokemon que se recibió
    const seePokemonInfo = (pokemon) => setShowInfoPokemon({ showInfoPokemon: true, pokemon });
    // Regresa al estado inicial
    const dontSeePokemonInfo = () => setShowInfoPokemon({ showInfoPokemon: false, pokemon: {} });
    // temporales

    // Guarda la info obtenida del input para buscar pokemon
    const [inputValue, setInputValue] = useState('');

    // Función que se ejecutará al realizar nuestra búsqueda en el input, recibe como evento el envio del form que a su vez contiene al input
    const searchPokemonInInput = async (event) => {
        // Para que no se recargue la página al enviar el formulario
        event.preventDefault();

        // Validar si input value es vacio, si es vacio, no va a hacer nada
        if (!inputValue) return;

        const answerSearchOfPokemon = await searchPokemon(inputValue);
        setShowInfoPokemon({showInfoPokemon: true, pokemon: answerSearchOfPokemon});

        // limpiar el input para que una ves ingresado un valor y dado enter, se limpie el input
        setInputValue('');
    }
    //

    return (
        // dataLength={pokemones.length} - donde length corresponde al tamaño del arreglo pokemones
        // next - es la funcion addNextTwentyPokemons que se ejecutará cuando se llegue al final de la página
        // hasMore - indicará cuando se quiere mostrar mas pokémons, en este caso por la variable booleana seeMore
        // loader - mientras ejecuta la petición, mostrará el elemento html proporcionado con la frase: <h3>Cargando mas pokémons...</h3>
        // endMessage - mostrar componente en caso de que se haya llegado al final de la petición y no haya mas por mostrar

        // temporales
        <>
            {/* temporal Desestructura la variable de estado que es un arreglo */}
            <PokemonStadistics
                mostrar={showInfoPokemon.showInfoPokemon}
                pokemon={showInfoPokemon.pokemon}
                cerrar={dontSeePokemonInfo}
            />

            <Search inputValue={inputValue} setInputValue={setInputValue} searchPokemonInInput={searchPokemonInInput} />

            <InfiniteScroll
                dataLength={pokemones.length}
                next={addNextTwentyPokemons}
                hasMore={seeMore}
                loader={<h3 style={{ textAlign: 'center', gridColumn: '2/5' }}>Cargando mas pokémons...</h3>}
                endMessage={<h3 style={{ textAlign: 'center', gridColumn: '2/5' }}>¡No hay mas resultados!</h3>}
                className='pokemon-container'
            >
                {/* Mapeo de cada uno de nuestros pokemones obtenidos a traves de la urlAPI, con id, nombre e imagen */}
                {
                    pokemones.map((pokemon) => {
                        return (
                            // La etiqueta del Componente PokemonItem debe tener el atributo key y se le asigna el id obtenido para cada pokémon
                            <PokemonItem
                                key={pokemon.id}
                                id={pokemon.id}
                                name={pokemon.name}
                                image={pokemon.image}
                                seePokemonInfo={() => seePokemonInfo(pokemon)}
                            />
                        )
                    })
                }

            </InfiniteScroll>
        </>
    )
}
