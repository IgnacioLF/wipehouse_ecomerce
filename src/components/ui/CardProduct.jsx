import './CardProduct.scss'
import LightBlueButton from "./LightBlueButton"
import { getIcon } from '../../Utils'


const CardProduct = ({tittle, buttonOnClick}) => {

    return (
        <div className='card'>
            <img loading='lazy' src={getIcon(tittle)} alt={tittle}/>
            <div className='inside'>
                <h2>{tittle}</h2>
                <LightBlueButton buttonclick={buttonOnClick}>Comprar</LightBlueButton>
            </div>
        </div>
    )
}

export default CardProduct;