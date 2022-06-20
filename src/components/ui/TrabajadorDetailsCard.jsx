import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './TrabajadorDetailsCard.scss'
import LightBlueButton from './LightBlueButton'
import { fetchTrabajadorStart, setTrabajador } from '../../redux/Trabajadores/trabajadores.actions'
import { getIconDark } from '../../Utils'
import { addProductToCart } from '../../redux/Cart/cart.actions'
import InputLabel from '../form/components/InputLabel'
import { useAddCartItem } from '../../customHooks/useAddCartItem'
import Errordiv from './Errordiv'

const mapState = ({ trabajadoresData }) => ({
    trabajador: trabajadoresData.trabajador
})

const TrabajadorDetailsCard = () => {
    const dispatch = useDispatch();
    const { trabajadorID } = useParams();
    const { trabajador } = useSelector(mapState);
    const { nombre, imageURL, precio, descripcion, categoria } = trabajador; 
    const [ form, setForm ] = useState({
        quantity: 1
    });
    const {errors, validateForm, onBlurField } = useAddCartItem(form);

    useEffect(() => {
        dispatch(fetchTrabajadorStart(trabajadorID))

        return () => {
            dispatch(setTrabajador({}))
        }

    },[])

    const onUpdateField= (e) => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value
        };
        setForm(nextFormState);
        if (errors[field].touched){
            validateForm({
                form: nextFormState,
                errors,
                field,
            })
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (!trabajador) return;
        const { isValid } = validateForm({form, errors, forceTouchErrors: true});
        if (!isValid) return;
        const cartItem = {
            ...trabajador,
            ...form,
            documentID: trabajadorID,
            quantity: parseInt(form.quantity)
        }
        dispatch(addProductToCart(cartItem))
    }

    return(
        <div className='trabajadoresDetailsCard'>
            <div className='insideDetails'>
                <div className='detailsimage'>
                    <img loading='lazy' src={imageURL} />
                </div>
                <div className='detailsNombrePrecioCat'>
                    <div className='detailsCategoria'>
                        <img loading='lazy' src={getIconDark(categoria)} />
                        <span>{categoria}</span>
                    </div>
                    <h1>{nombre}</h1>
                    <h2>{precio}€<span className='precioHora'>/hora</span></h2>
                    <form onSubmit={handleOnSubmit}>
                        <InputLabel label={'Horas'} inputtype={'number'} inputmin={1} inputname={'quantity'} inputvalue={form.quantity}inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.quantity.touched && errors.quantity.error ? true : null} />
                        {errors.quantity.touched && errors.quantity.error ? (<Errordiv mensaje={errors.quantity.message} />) : null}
                        <LightBlueButton type={'submit'} buttonName={'addtocart'} >Añadir al carro</LightBlueButton>
                    </form>
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