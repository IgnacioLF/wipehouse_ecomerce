import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import logoimage from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { checkUserIsAdmin } from '../Utils.js'
import { signOutUserStart } from '../redux/User/user.actions';
import { selectCartItemsCount } from '../redux/Cart/cart.selectors';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});

const Header = (props) => {
    const { currentUser,totalNumCartItems } = useSelector(mapState)
    const isAdmin = checkUserIsAdmin(currentUser)
    const dispatch = useDispatch();
    const [ mobileMenu, setMobileMenu ] = useState(false)

    const signOut = () => {
        dispatch(signOutUserStart())
    }

    const handleMobileMenuClick = () => {
        if(mobileMenu){
            setMobileMenu(false)
        } else {
            setMobileMenu(true)
        }
    }

    return (
    <header className='header'>
        { isAdmin ? (
            <div className='adminuser'>
                <ul>
                    <Link to="/adminpanel">
                        <li>Panel de administrador</li>
                    </Link>
                </ul>
            </div>
            ) : null}
        <div className='bottomheader'>
            <div className='logo'>
                <Link to="/">
                    <img loading='lazy' src={logoimage} alt="Wipehouse"></img>
                </Link>
            </div>
            <nav className='middlemenu'>
                <ul>
                    <li><Link to="/"><i className="bi bi-house"></i>Inicio</Link></li>
                    <li><Link to="/search"><i className="bi bi-search"></i>Buscar</Link></li>
                </ul>
            </nav>
            <nav className='menu'>
                <ul>
                    <li>
                        <Link to="/carro" >
                            <i className="bi bi-cart"></i>
                            Mi carrito ({totalNumCartItems})
                        </Link>
                    </li>
                    {currentUser&& [
                        <li key={1}><Link to="/account"><i className="bi bi-person"></i>Cuenta</Link></li>,
                        <li key={2}>
                            <span onClick={signOut}><i className="bi bi-box-arrow-left"></i>Salir</span>
                        </li>
                    ]}
                    {!currentUser && [
                        <li key={1} ><Link to="/login"><i className="bi bi-box-arrow-in-right"></i>Entrar</Link></li>,
                        <li key={2} >
                            <Link to="/register"><i className="bi bi-pencil-square"></i>Registrarse</Link>
                        </li>
                    ]}
                </ul>
            </nav>
            <div className='mobileMenu' onClick={() => handleMobileMenuClick()}>
                <i className={mobileMenu ? "bi bi-list close" : "bi bi-list open"}></i>
                <i className={mobileMenu ? "bi bi-x-circle red open" : "bi bi-x-circle red close"}></i>
            </div>
            {mobileMenu ? (
            <div className='openMobileMenu'>
                <ul>
                    <li><Link to="/"><i className="bi bi-house"></i>Inicio</Link></li>
                    <li><Link to="/search"><i className="bi bi-search"></i>Buscar</Link></li>
                    <li>
                        <Link to="/carro" >
                            <i className="bi bi-cart"></i>
                            Mi carrito ({totalNumCartItems})
                        </Link>
                    </li>
                    {currentUser&& [
                        <li key={1}><Link to="/account"><i className="bi bi-person"></i>Cuenta</Link></li>,
                        <li key={2}>
                            <span onClick={signOut}><i className="bi bi-box-arrow-left"></i>Salir</span>
                        </li>
                    ]}
                    {!currentUser && [
                        <li key={1} ><Link to="/login"><i className="bi bi-box-arrow-in-right"></i>Entrar</Link></li>,
                        <li key={2} >
                            <Link to="/register"><i className="bi bi-pencil-square"></i>Registrarse</Link>
                        </li>
                    ]}
                </ul>
            </div>
            ) : null}
        </div>
    </header>
    )
}

Header.defaultProps = {
    currentUser: null,
}

export default Header;