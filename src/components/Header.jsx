/* eslint-disable react/jsx-key */
import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import logoimage from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { checkUserIsAdmin } from '../Utils.js'
import { signOutUserStart } from '../redux/User/user.actions';
import { selectCartItemsCount } from '../redux/Cart/cart.selectors';


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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/search">Buscar</Link></li>
                </ul>
            </nav>
            <nav className='menu'>
                <ul>
                    <li>
                        Carro ({totalNumCartItems})
                    </li>
                    {currentUser&& [
                        <li><Link to="/account">Account</Link></li>,
                        <li>
                            <span onClick={signOut}>Logout</span>
                        </li>
                    ]}
                    {!currentUser && [
                        <li><Link to="/login">Login</Link></li>,
                        <li>
                            <Link to="/register">Register</Link>
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