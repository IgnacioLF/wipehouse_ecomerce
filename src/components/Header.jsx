import './Header.scss';
import { connect } from 'react-redux';
import logoimage from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/utils'; 

const Header = ({currentUser}) => {
    return (
    <header className='header'>
        <div className='logo'>
            <Link to="/">
                <img src={logoimage} alt="Wipehouse"></img>
            </Link>
        </div>
        <nav className='menu'>

            {currentUser&&(
                <ul>
                    <li>
                        <span onClick={() => {
                            auth.signOut()
                            }}>Logout</span>
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
    </header>
    )
}


Header.defaultProps = {
    currentUser: null,
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToProps,null)(Header);