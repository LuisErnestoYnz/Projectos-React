import { useState } from "react";
import { BuscarIcono } from "../helpers/Icons";
import './Search.css';

// Componente para generar el input y realizar búsqueda de pokémones. funcion searchPokemon para ejecutar al realizar la busqueda
export const Search = ( { inputValue, setInputValue, searchPokemonInInput} ) => {

    return (
        <section>
            <h2 className="titulo">React Pokédex</h2>
            {/* Type, placeholder y value son conocidos como properties aqui, no como atributos html */}
            {/* value - se obtiene lo que se ha escrito en el input */}
            {/* onChange - actualiza la variable de inputValue */}
            {/* onSubmit - para enviar lo que tengamos dentro de nuestro form  */}
            <form onSubmit={ searchPokemonInInput }>
                <input
                    className="input-buscar"
                    type='text'
                    placeholder='Search Pokémon...'
                    value={ inputValue }
                    onChange={ (event) => setInputValue(event.target.value) }
                />
                <button className="btn-buscar" type="submit">
                    <BuscarIcono />
                    Buscar
                </button>
            </form>
        </section>
    )
}
