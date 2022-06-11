import { Routes,Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Homepage from './pages/Homepage.jsx';
import Registration from './pages/Registration.jsx';
import Loginpage from './pages/Loginpage.jsx';
import './default.scss';
import { useEffect } from 'react';
import { checkUserSesion } from './redux/User/user.actions.js';
import { useSelector, useDispatch } from 'react-redux';
import MyAccount from './pages/MyAccount.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import { checkUserIsAdmin } from './Utils.js';
import Searchpage from './pages/Searchpage.jsx';
import TrabajadorDetails from './pages/TrabajadorDetails.jsx';
import Cartpage from './pages/CartPage.jsx';
import Paymentpage from './pages/Paymentpage.jsx';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const App = (props) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState)
    const isAdmin = checkUserIsAdmin(currentUser)
    useEffect (() => {
        dispatch(checkUserSesion())
    },[])  
 
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
                <Route exact path="/search" element={<Searchpage />} />
                <Route path="/search/:filterType" element={<Searchpage />} />
                <Route path="/trabajador/:trabajadorID" element={<TrabajadorDetails />} />
                <Route path="/carro" element={<Cartpage />} />
                <Route path="/payment" element={<Paymentpage />} />
            </Routes>
            </div>
        </div>
    )

}

export default App ;