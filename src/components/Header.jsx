import './Header.scss';
import { useSelector } from 'react-redux';
import logoimage from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/utils';
import { checkUserIsAdmin } from '../Utils.js'


const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const Header = (props) => {
    const { currentUser } = useSelector(mapState)
    const isAdmin = checkUserIsAdmin(currentUser)
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
            <nav className='menu'>

                {currentUser&&(
                    <ul>
                        <li><Link to="/account">Account</Link></li>
                        <li>
                            <span onClick={() => {auth.signOut()}}>Logout</span>
                        </li>
                    </ul>
                )}
                {!currentUser && (
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    </header>
    )
}


Header.defaultProps = {
    currentUser: null,
}


export default Header;