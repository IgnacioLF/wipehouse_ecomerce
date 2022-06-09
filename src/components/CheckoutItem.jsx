import './CheckoutItem.scss'
import RedButton from './ui/RedButton'
import { useDispatch } from 'react-redux'
import { removeCartItem, addProductToCart, reduceCartItem } from '../redux/Cart/cart.actions'
import LightBlueButton from './ui/LightBlueButton';

const CheckoutItem = ({item,pos}) => {
    const dispatch = useDispatch();
    const {
        nombre,
        imageURL,
        precio,
        quantity,
        documentID
    } = item

    const handleRemoveCartItem = (documentID) => {
        dispatch(removeCartItem({ documentID }))
    }

    const handleAddProduct = (item) => {
        dispatch(addProductToCart(item))
    }

    const handleReduceProduct = (item) => {
        dispatch(reduceCartItem(item))
    }

    return(
        <tr key={pos} className='checkoutItem'>
            <td className='checkoutImage'>
                <img src={imageURL} alt={nombre}/>
            </td>
            <td>
                {nombre}
            </td>
            <td className='checkoutCantidad'>
                <LightBlueButton buttonclick={() => handleReduceProduct(item)}>{'<'}</LightBlueButton>
                <span>
                    {quantity}
                </span>
                <LightBlueButton buttonclick={() => handleAddProduct(item)}>{'>'}</LightBlueButton>
            </td>
            <td>
                {precio}€
            </td>
            <td className='checkoutEliminar'>
                <RedButton buttonclick={() => handleRemoveCartItem(documentID)}>x</RedButton>
            </td>
        </tr>
    )
}

export default CheckoutItem