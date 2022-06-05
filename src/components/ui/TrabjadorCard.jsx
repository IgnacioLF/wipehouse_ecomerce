import LightBlueButton from './LightBlueButton'
import './TrabajadorCard.scss'

const TrabajadorCard = ({nombre, precio, imageURL, categoria}) => {

    return (
        <div className="trabajadorCard">
            <img src={imageURL} alt={nombre} />
            <div className='trabajadorCardData'>
                <ul>
                    <li><span>{categoria}</span></li>
                    <li className='middleCard'>
                        <span>{nombre}</span>
                        <span className='precioCard'>{precio} €</span>
                    </li>
                </ul>
                <LightBlueButton>Añadir al carro</LightBlueButton>
            </div>
        </div>
    )
}


export default TrabajadorCard