import './Header.scss';
import logoimage from '../assets/logo.png';

const Header = () => {
    return (
    <header className='header'>
        <div className='logo'>
            <img src={logoimage} alt="Wipehouse"></img>
        </div>
    </header>
    )
}

export default Header;