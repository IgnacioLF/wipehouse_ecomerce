import './CardProduct.scss'
import LightBlueButton from "./LightBlueButton"
import { getIcon } from '../../Utils'


const CardProduct = ({tittle,desc}) => {

    return (
        <div className='card'>
            <img  src={getIcon(tittle)}/>
            <div className='inside'>
                <h2>{tittle}</h2>
                <LightBlueButton>Comprar</LightBlueButton>
            </div>
        </div>
    )
}

export default CardProduct;