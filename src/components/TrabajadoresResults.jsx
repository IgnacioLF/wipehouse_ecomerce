import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrabajadoresStart } from '../redux/Trabajadores/trabajadores.actions';
import { useNavigate, useParams } from 'react-router-dom';
import './TrabajadoresResults.scss'
import TrabajadorCard from './ui/TrabjadorCard';
import { ProductTypes } from '../Utils';
import SelectLabel from './form/components/SelectLabel';


const mapState = ({ trabajadoresData }) => ({
    trabajadores: trabajadoresData.trabajadores
});

const TrabajadoresResults = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { filterType } = useParams();
    const { trabajadores } = useSelector(mapState); 

    useEffect(() => {
        dispatch(fetchTrabajadoresStart({ filterType }))
    }, [ filterType ])

    const configFilters = [{
        value: '',
        name: 'Mostrar todos'
    }]
    ProductTypes.forEach(type => {
        configFilters.push({
            value: type,
            name: type
        })
    })

    const handleFilter = (e) => {
        const nextFilter= e.target.value;
        navigate(`/search/${nextFilter}`)
    }

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
            <SelectLabel  selectOptions={configFilters} selectChange={handleFilter} selectValue={filterType} />
            <div className='insideResults'>
                { trabajadores.map((trabajador, pos) => {
                const { imageURL,nombre,precio,categoria} = trabajador

                    return(
                        <TrabajadorCard key={pos} nombre={nombre} precio={precio} imageURL={imageURL} categoria={categoria}/>
                    )
                })}
            </div>
        </div>
    )
}

export default TrabajadoresResults;