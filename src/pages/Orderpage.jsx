import './Orderpage.scss'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetailsStart } from '../redux/Orders/orders.actions'
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import SideNavAdmin from '../components/SideNavAdmin'
import { signOutUserStart } from '../redux/User/user.actions';
import { checkUserIsAdmin } from '../Utils';

const mapState = ({orderData, user}) => ({
    currentUser: user.currentUser,
    orderDetails: orderData.orderDetails
})

const Orderpage = () => {
    const { orderID } = useParams();
    const dispatch = useDispatch();
    const { orderDetails, currentUser } = useSelector(mapState)
    const { orderTotal, orderItems } = orderDetails
    const navigate = useNavigate();
    const isAdmin = checkUserIsAdmin(currentUser)

    useEffect(() => {
        dispatch(getOrderDetailsStart(orderID))
    } ,[]) 

    const signOut = () => {
        dispatch(signOutUserStart())
    }

    if (!orderItems) return
    return(
        <div className={isAdmin ? ('orderPage adminacc') : 'orderPage useracc'}>
            {!currentUser ? (<Navigate to="/login"/>) : null}
            <SideNavAdmin>
                <ul>
                    <li onClick={() => navigate('/')}>
                        Home
                    </li>
                    <li onClick={signOut}>
                        Sing out
                    </li>
                </ul>
            </SideNavAdmin>
            <div className='contentOrderPage'>
                <h1>ID del pedido : {orderID}</h1>
                <table className='orderItemsTable'>
                    <thead>
                        <tr>
                            <th>Trabajador</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map((item, pos) => {
                            const { imageURL, nombre, precio, quantity, documentID} = item

                            return(
                                <tr key={pos} onClick={() => navigate(`/trabajador/${documentID}`)}>
                                    <td><img src={imageURL}/></td>
                                    <td>{nombre}</td>
                                    <td>{precio}€</td>
                                    <td>{quantity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <h2>Precio total : {orderTotal}€</h2>
            </div>
        </div>
    )
}

export default Orderpage