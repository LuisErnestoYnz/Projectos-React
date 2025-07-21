import { NavBar } from './components/NavBar';
import { Search } from './components/Search';
import { PokemonGrid } from './components/PokemonGrid';
import { PokemonStadistics } from './components/PokemonStadistics';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export const PokedexApp = () => {

    return (
        <div>
            {/* NavBar con logo de Pokémon */}
            <NavBar />

            {/* basename={process.env.PUBLIC_URL} Para adaptar correctamente las rutas en el entorno de Pages */}
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                {/* HomeAbout Section */}
                <section style={{textAlign: 'center', color: 'silver', display: 'flex', justifyContent: 'space-evenly'}}>
                    <Link to={'/'}>Home </Link>
                    <Link to={'/about'}> About</Link>
                    {/* <Link to={'/pokemonStadistic'}></Link>   algo que conecte con las imagenes de los pokemones */}
                </section>
            
                <Routes>
                    <Route path='/' element={
                        <>
                            {/* <Search />  */}
                            <PokemonGrid />
                        </>
                    }/>   
                    <Route path='/about' element={
                        <>
                            <p style={{textAlign: 'center'}}>Created By Luis Ernesto</p>
                        </>    
                    }/>

                    {/* <Route path='/pokemonStadistic' element={
                        <PokemonStadistics /> 
                    }/> */}
                </Routes>
                {/* Buscador de pokemones y titulo Section */}
                

                {/* Cuadrícula de Pokemones */}
                
            </BrowserRouter>
            
        </div>
    )
}
