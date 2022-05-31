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
import { useSelector, useDispatch } from 'react-redux';
import MyAccount from './pages/MyAccount.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import { checkUserIsAdmin } from './Utils.js';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const App = (props) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState)
    const isAdmin = checkUserIsAdmin(currentUser)

    useEffect(() =>{
        const authListener = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth)
                onSnapshot(userRef,snapshot => {
                    dispatch(setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    }))
                })
            } else {
                dispatch(setCurrentUser(userAuth))
            }
        })

        return () => {
            authListener();
        }

    }, [])

    return  (
        <div >
            <Header />
            <div className={isAdmin ? ('admin') : 'user'}>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/account" element={<MyAccount />} />
                <Route path="/adminpanel" element={<AdminPanel />} />
            </Routes>
            </div>
        </div>
    )

}

export default App ;