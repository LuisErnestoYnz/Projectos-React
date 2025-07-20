import './PokemonItem.css';

// Componente que muestra los item o tarjetas de cada uno de los pokémons, Recibe como props id, nombre e image,  
export const PokemonItem = ( {id, name, image, seePokemonInfo} ) => {  // temporal verPokemon
    return (
        // Al dar click en la tarjeta del pokemon, de mostrará su info con el evento onClick={seePokemonInfo}
        <div className='pokemon-card' onClick={seePokemonInfo}>
            <img src={ image } alt={ name } />
            <p>{`${ id }. ${ name }`}</p>
        </div>
    )
}
