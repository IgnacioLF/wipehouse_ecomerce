import { Routes,Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Homepage from './pages/Homepage.jsx';
import Registration from './pages/Registration.jsx';
import Loginpage from './pages/Loginpage.jsx';
import { auth,handleUserProfile } from './firebase/utils.js';
import './default.scss';
import { useEffect } from 'react';
import { onSnapshot } from "firebase/firestore";
import { setCurrentUser } from './redux/User/user.actions.js';
import { connect } from 'react-redux';
import MyAccount from './pages/MyAccount.jsx';


const App = (props) => {
    const { setCurrentUser } = props;

    useEffect(() =>{
        const authListener = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth)
                onSnapshot(userRef,snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    })
                })
            } else {
                setCurrentUser(userAuth)
            }
        })

        return () => {
            authListener();
        }

    }, [])

    return  (
        <div >
            <Header />
            <div className='main'>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/account" element={<MyAccount />} />
            </Routes>
            </div>
        </div>
    )

}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);