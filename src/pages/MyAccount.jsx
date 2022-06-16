import { useDispatch, useSelector } from 'react-redux';
import SideNavAdmin from '../components/SideNavAdmin'
import { Link, Navigate } from 'react-router-dom';
import './MyAccount.scss'
import { signOutUserStart } from '../redux/User/user.actions';
import { useEffect } from 'react';
import { getUserOrderHistory } from '../redux/Orders/orders.actions'
import OrderHistory from '../components/OrderHistory';
import { checkUserIsAdmin } from '../Utils';



const mapState = ({ user, orderData }) => ({
    currentUser: user.currentUser,
    orderHistory: orderData.orderHistory.data 
});

const MyAccount = () => {
    const { currentUser, orderHistory } = useSelector(mapState)
    const dispatch = useDispatch();
    const isAdmin = checkUserIsAdmin(currentUser)

    useEffect(() => {
        dispatch(getUserOrderHistory(currentUser.id))
    }, [])

    const signOut = () => {
        dispatch(signOutUserStart())
    }
    return(
    <div className={isAdmin ? ('adminacc myaccount') : 'useracc myaccount'}>
        {!currentUser ? (<Navigate to="/login"/>) : null}
        <SideNavAdmin>
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li onClick={signOut}>
                    Sing out
                </li>
            </ul>
        </SideNavAdmin>
        <div className='contentMyaccount'>
            <h1>Historial de pedidos</h1>
            <OrderHistory  orders={orderHistory} />
        </div>
    </div>
    )
}


export default MyAccount;