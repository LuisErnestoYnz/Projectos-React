import { LogoIcono } from "../helpers/Icons";
import './NavBar.css';

// Componente que utiliza el Logo de helpers para agregar el logotipo de Pokémon
export const NavBar = () => {
    return (
        <nav>
            <LogoIcono />
        </nav>
    )
}
