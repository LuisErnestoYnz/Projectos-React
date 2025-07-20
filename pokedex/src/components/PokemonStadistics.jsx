import './PokemonStadistics.css';

// cerrar reinicia la variable de estado de mostrar para ocultar el componente 
export const PokemonStadistics = ({mostrar, pokemon, cerrar}) => {

  return (
    // quitar onClick porque solo es para ventana modal
    <div className='stadistic-container' onClick={cerrar} style={{display: mostrar ? 'grid' : 'none'}}>

        <section className='body-container'>
            <div className='pokemon-title'>
              <h1 style={{textTransform: 'capitalize'}}>{`${pokemon.name} Data`}</h1>
            </div>
            <div className='pokemon-image'>
              <img src={pokemon.image} alt={pokemon.name} />
            </div>

            <div className='pokemon-info'>
              <hr />
              <p><span>Number: </span>{pokemon.id}</p>
              <hr />
              <p><span>Species: </span>{pokemon.species}</p>
              <hr />
              <p><span>Height: </span>{`${pokemon.height} m.`}</p>
              <hr />
              <p><span>Weight: </span>{`${pokemon.weight} Kg.`}</p>
              <hr />
              <section>
                <p><span>Types: </span>
                  { pokemon.types?.map((type) => <span className='type' key={type}>{`${type} `}</span>) }
                </p>
              </section>
              <hr />
              
              
            </div>
        </section>

    </div>
  )
}
