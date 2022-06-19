import { useDispatch, useSelector } from 'react-redux';
import SideNavAdmin from '../components/SideNavAdmin'
import { Link, Navigate } from 'react-router-dom';
import './MyAccount.scss'
import { signOutUserStart } from '../redux/User/user.actions';
import { useEffect, useState } from 'react';
import { getUserOrderHistory } from '../redux/Orders/orders.actions'
import OrderHistory from '../components/OrderHistory';
import { checkUserIsAdmin } from '../Utils';
import orderError from '../assets/orderError.png'


const mapState = ({ user, orderData }) => ({
    currentUser: user.currentUser,
    orderHistory: orderData.orderHistory.data 
});

const MyAccount = () => {
    const { currentUser, orderHistory } = useSelector(mapState)
    const dispatch = useDispatch();
    const isAdmin = checkUserIsAdmin(currentUser)
    const [ orderHistoryLength, setOrderHistoryLength ] = useState(0)

    useEffect(() => {
        dispatch(getUserOrderHistory(currentUser.id))
    }, [])

    useEffect(() => {
        if (orderHistory){
            setOrderHistoryLength(orderHistory.length)
        }
    },[orderHistory])

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
                        Inicio
                    </Link>
                </li>
                <li onClick={signOut}>
                    Salir
                </li>
            </ul>
        </SideNavAdmin>
        <div className='contentMyaccount'>
            <h1>Historial de pedidos</h1>
            {orderHistoryLength > 0 ? (<OrderHistory  orders={orderHistory} />) :
            (<div className='orderError'>
                <p>No tienes ningun pedido realizado</p>
                <img src={orderError} />
            </div>)}
        </div>
    </div>
    )
}


export default MyAccount;