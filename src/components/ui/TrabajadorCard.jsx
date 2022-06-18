import LightBlueButton from './LightBlueButton'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './TrabajadorCard.scss'
import { addProductToCart } from '../../redux/Cart/cart.actions'
 import { getIconDark} from '../../Utils'

const TrabajadorCard = ({trabajador}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {nombre, precio, imageURL, categoria, documentID} = trabajador

    if (!documentID || !imageURL || !nombre ) return null;
    const cardOnClick = (e) => {
        if (e.target.name === 'addtocart') return null;
        navigate(`/trabajador/${documentID}`)
    }

    const handeAddToCart = (trabajador) => {
        if (!trabajador) return;
        const configItem = {
            ...trabajador,
            quantity: 1
        }
        dispatch( addProductToCart(configItem) )
    }

    return ( 
        <div className="trabajadorCard" onClick={cardOnClick}>
            <img loading='lazy' className='trabajadorCardImage' src={imageURL} alt={nombre} />
            <div className='trabajadorCardData'>
                <ul>
                    <li className='categoriaCard'>
                        <img loading='lazy' className='iconCard' src={getIconDark(categoria)} />
                        <span>{categoria}</span>
                    </li>
                    <li className='middleCard'>
                        <span>{nombre}</span>
                        <span className='precioCard'>{precio}€<span className='precioHora'>/hora</span></span>
                    </li>
                </ul>
                <LightBlueButton buttonName={'addtocart'} buttonclick={() => handeAddToCart(trabajador)} >Añadir al carro</LightBlueButton>
            </div>
        </div>
    )
}


export default TrabajadorCard