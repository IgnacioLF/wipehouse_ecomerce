import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrabajadoresStart } from '../redux/Trabajadores/trabajadores.actions';
import './TrabajadoresResults.scss'
import TrabajadorCard from './ui/TrabjadorCard';

const mapState = ({ trabajadoresData }) => ({
    trabajadores: trabajadoresData.trabajadores
});

const TrabajadoresResults = () => {
    const dispatch = useDispatch();
    const { trabajadores } = useSelector(mapState); 

    useEffect(() => {
        dispatch(fetchTrabajadoresStart())
    }, [])

    if (!Array.isArray(trabajadores)) return null;

    if (trabajadores.length<1) {
        return (
            <div className='trabajadoresResults'>
                <h1>
                    No hay resultados
                </h1>
            </div>
        )
    }

    return (
        <div className='trabajadoresResults'>
            <h1>Buscar trabajadores</h1>
            <div className='insideResults'>
                { trabajadores.map((trabajador, pos) => {
                const { imageURL,nombre,precio,categoria} = trabajador

                    return(
                        <TrabajadorCard key={pos} nombre={nombre} precio={precio} imageURL={imageURL} categoria={categoria} />
                    )
                })}
            </div>
        </div>
    )
}

export default TrabajadoresResults;