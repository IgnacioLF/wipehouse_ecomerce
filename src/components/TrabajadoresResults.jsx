import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrabajadoresStart } from '../redux/Trabajadores/trabajadores.actions';
import { useNavigate, useParams } from 'react-router-dom';
import './TrabajadoresResults.scss'
import TrabajadorCard from './ui/TrabajadorCard';
import { ProductTypes } from '../Utils';
import SelectLabel from './form/components/SelectLabel';
import LoadMore from './LoadMore';
import "bootstrap-icons/font/bootstrap-icons.css";
import LightBlueButton from './ui/LightBlueButton';

const mapState = ({ trabajadoresData }) => ({
    trabajadores: trabajadoresData.trabajadores
});

const TrabajadoresResults = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { filterType } = useParams();
    const { trabajadores } = useSelector(mapState); 
    const { data, queryDoc, isLastPage } = trabajadores;
    const [ filterName, setFilterName ] = useState('')

    const handleLoadMore = () => {
        dispatch(fetchTrabajadoresStart({ 
            filterType,
            filterName, 
            startAfterDoc: queryDoc,
            persistTrabajadores: data
         }))
    }
    const configLoadMore = {
        onLoadMoreEvent: handleLoadMore,
    }

    useEffect(() => {
        dispatch(fetchTrabajadoresStart({ filterType, filterName }))
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

    const handleOnClickSearch = () => {
        dispatch(fetchTrabajadoresStart({ filterType, filterName }))
    }

    const handleFilter = e => {
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
            <div className='resultsSearchBar'>
                <input type={'text'} placeholder={'Buscar Nombre '} name={'filterName'} value={filterName} onChange={(e) => setFilterName(e.target.value)} />
                <LightBlueButton buttonclick={handleOnClickSearch}><i className="bi bi-search"></i></LightBlueButton>
            </div>
            <div className='resultsCategoriaFilter'>
                <h2>Categoría : </h2>
                <SelectLabel  selectOptions={configFilters} selectChange={handleFilter} selectValue={filterType} />
            </div>
            <div className='insideResults'>
                { data.map((trabajador, pos) => {
                    return(
                        <TrabajadorCard key={pos} trabajador={trabajador} />
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