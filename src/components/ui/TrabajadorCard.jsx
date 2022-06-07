import LightBlueButton from './LightBlueButton'
import { useNavigate } from 'react-router-dom'
import './TrabajadorCard.scss'

const TrabajadorCard = ({trabajador}) => {
    const navigate = useNavigate();
    const {nombre, precio, imageURL, categoria, documentID} = trabajador

    if (!documentID || !imageURL || !nombre ) return null;
    const cardOnClick = (e) => {
        if (e.target.name === 'addtocart') return null;
        navigate(`/trabajador/${documentID}`)
    }
    return ( 
        <div className="trabajadorCard" onClick={cardOnClick}>
            <img src={imageURL} alt={nombre} />
            <div className='trabajadorCardData'>
                <ul>
                    <li><span>{categoria}</span></li>
                    <li className='middleCard'>
                        <span>{nombre}</span>
                        <span className='precioCard'>{precio} €</span>
                    </li>
                </ul>
                <LightBlueButton buttonName={'addtocart'} buttonclick={()=>{console.log('test')}} >Añadir al carro</LightBlueButton>
            </div>
        </div>
    )
}


export default TrabajadorCard