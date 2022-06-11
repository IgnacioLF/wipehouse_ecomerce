/* eslint-disable react/jsx-key */
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import LightBlueButton from './ui/LightBlueButton';
import CheckoutItem from './CheckoutItem';
import { useNavigate } from 'react-router-dom';
import './Checkout.scss'

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, total } = useSelector(mapState)

    const handleContinuarComprando = () => {
        navigate('/search')
    }

    const handleRealizarPedido = () => {
        navigate('/payment')
    }

    return (
        <div className='checkout'>
            <h1>Mi Carrito</h1>
            <div className='cart'>
                {cartItems.length > 0 ? (                
                    <table className='checkoutTable'>
                        <tbody>
                            <tr className='checkoutHeader'>
                                <th>Trabajador</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Eliminar</th>
                            </tr>
                            {cartItems.map((item,pos) => {
                                return(
                                    <CheckoutItem item={item} pos={pos} />
                                )
                            })}
                            <tr>
                                <td colSpan={5} className='checkoutTotal'>
                                    <h3>Total: {total}€</h3>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5}>
                                    <div className='checkoutButtons'>
                                        <LightBlueButton buttonclick={() => handleContinuarComprando()}>Continuar comprando</LightBlueButton>
                                        <LightBlueButton buttonclick={() => handleRealizarPedido()}>Realizar pedido</LightBlueButton>
                                    </div>
                                </td>
                            </tr> 
                        </tbody>
                    </table>) : (
                    <p>
                        El carro esta vacío
                    </p>)}
            </div>
        </div>
    )
}

export default Checkout