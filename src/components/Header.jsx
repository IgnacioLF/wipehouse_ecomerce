import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import logoimage from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { checkUserIsAdmin } from '../Utils.js'
import { signOutUserStart } from '../redux/User/user.actions';
import { selectCartItemsCount } from '../redux/Cart/cart.selectors';
import "bootstrap-icons/font/bootstrap-icons.css";


const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});

const Header = (props) => {
    const { currentUser,totalNumCartItems } = useSelector(mapState)
    const isAdmin = checkUserIsAdmin(currentUser)
    const dispatch = useDispatch();

    
    const signOut = () => {
        dispatch(signOutUserStart())
    }
    //  userRoles.includes('admin')

    return (
    <header className='header'>
        { isAdmin ? (
            <div className='adminuser'>
                <ul>
                    <Link to="/adminpanel">
                        <li>Admin panel</li>
                    </Link>
                </ul>
            </div>
            ) : null}
        <div className='bottomheader'>
            <div className='logo'>
                <Link to="/">
                    <img src={logoimage} alt="Wipehouse"></img>
                </Link>
            </div>
            <nav className='middlemenu'>
                <ul>
                    <li><Link to="/"><i className="bi bi-house"></i>Home</Link></li>
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
                        <li key={1}><Link to="/account"><i className="bi bi-person"></i>Account</Link></li>,
                        <li key={2}>
                            <span onClick={signOut}><i className="bi bi-box-arrow-left"></i>Logout</span>
                        </li>
                    ]}
                    {!currentUser && [
                        <li key={1} ><Link to="/login"><i className="bi bi-box-arrow-in-right"></i>Login</Link></li>,
                        <li key={2} >
                            <Link to="/register"><i className="bi bi-pencil-square"></i>Register</Link>
                        </li>
                    ]}
                </ul>
            </nav>
        </div>
    </header>
    )
}


Header.defaultProps = {
    currentUser: null,
}


export default Header;