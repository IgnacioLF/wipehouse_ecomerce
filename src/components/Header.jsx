import './Header.scss';
import logoimage from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <header className='header'>
        <div className='logo'>
            <Link to="/">
                <img src={logoimage} alt="Wipehouse"></img>
            </Link>
        </div>
        <nav className='menu'>
            <ul>
                <li>Login</li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    </header>
    )
}

export default Header;