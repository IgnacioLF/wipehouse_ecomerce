import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './TrabajadorDetailsCard.scss'
import LightBlueButton from './LightBlueButton'
import { fetchTrabajadorStart, setTrabajador } from '../../redux/Trabajadores/trabajadores.actions'
import { getIconDark } from '../../Utils'

const mapState = ({ trabajadoresData }) => ({
    trabajador: trabajadoresData.trabajador
})

const TrabajadorDetailsCard = () => {
    const dispatch = useDispatch();
    const { trabajadorID } = useParams();
    const { trabajador } = useSelector(mapState);
    const { nombre, imageURL, precio, descripcion, categoria } = trabajador; 

    useEffect(() => {
        dispatch(fetchTrabajadorStart(trabajadorID))

        return () => {
            dispatch(setTrabajador({}))
        }

    },[])

    return(
        <div className='trabajadoresDetailsCard'>
            <div className='insideDetails'>
                <div className='detailsimage'>
                    <img src={imageURL} />
                </div>
                <div className='detailsNombrePrecioCat'>
                    <div className='detailsCategoria'>
                        <img src={getIconDark(categoria)} />
                        <span>{categoria}</span>
                    </div>
                    <h1>{nombre}</h1>
                    <h2>{precio} €</h2>
                    <LightBlueButton buttonName={'addtocart'} buttonclick={()=>{console.log('test')}} >Añadir al carro</LightBlueButton>
                </div>
                <div className='detailsDesc'>
                    <h3>Descripción :</h3>
                    <p>{descripcion}</p>
                </div>
            </div>
        </div>
    )
}

export default TrabajadorDetailsCard