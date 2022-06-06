import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrabajadoresStart } from '../redux/Trabajadores/trabajadores.actions';
import { useNavigate, useParams } from 'react-router-dom';
import './TrabajadoresResults.scss'
import TrabajadorCard from './ui/TrabjadorCard';
import { ProductTypes } from '../Utils';
import SelectLabel from './form/components/SelectLabel';
import LoadMore from './LoadMore';


const mapState = ({ trabajadoresData }) => ({
    trabajadores: trabajadoresData.trabajadores
});

const TrabajadoresResults = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { filterType } = useParams();
    const { trabajadores } = useSelector(mapState); 
    const { data, queryDoc, isLastPage } = trabajadores;

    const handleLoadMore = () => {
        console.log('test')
        dispatch(fetchTrabajadoresStart({ 
            filterType, 
            startAfterDoc: queryDoc,
            persistTrabajadores: data
         }))
    }
    const configLoadMore = {
        onLoadMoreEvent: handleLoadMore,
    }

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

    if (!Array.isArray(data)) return null;

    if (data.length<1) {
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
                { data.map((trabajador, pos) => {
                const { imageURL,nombre,precio,categoria} = trabajador

                    return(
                        <TrabajadorCard key={pos} nombre={nombre} precio={precio} imageURL={imageURL} categoria={categoria}/>
                    )
                })}
            </div>
            <div className='pagger'>
                {!isLastPage && (<LoadMore {...configLoadMore} />)}
            </div>
        </div>
    )
}

export default TrabajadoresResults;