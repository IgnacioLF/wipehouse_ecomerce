import LightBlueButton from './LightBlueButton'
import './TrabajadorCard.scss'

const TrabajadorCard = ({nombre, precio, imageURL, categoria}) => {

    return (
        <div className="trabajadorCard">
            <img src={imageURL} alt={nombre} />
            <ul>
                <li><span>{categoria}</span></li>
                <li>
                    <span className='nombre'>{nombre}</span>
                </li>
            </ul>
            <LightBlueButton>{precio} €</LightBlueButton>
        </div>
    )
}


export default TrabajadorCard