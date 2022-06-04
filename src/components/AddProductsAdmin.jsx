/* eslint-disable react/jsx-key */
import RedButton from './ui/RedButton';
import LightBlueButton from './ui/LightBlueButton';
import BlueButton from './ui/BlueButton';
import './AddProductsAdmin.scss'
import { useState, useEffect } from 'react';
import PopupForm from './ui/PopupForm';
import InputLabel from './form/components/InputLabel'
import SelectLabel from './form/components/SelectLabel';
import { ProductTypes } from '../Utils';
import { useAddProductsAdmin } from '../customHooks/useAddProductsAdmin';
import Errordiv from './ui/Errordiv'
import { useDispatch, useSelector } from 'react-redux';
import { addTrabajadorStart, deleteTrabjadorStart, fetchTrabajadoresStart } from '../redux/Trabajadores/trabajadores.actions';

const mapState = ({ trabajadoresData }) => ({
    trabajadores: trabajadoresData.trabajadores
});

const AddProductsAdmin = () => {
    const { trabajadores } = useSelector(mapState)
    const dispatch = useDispatch();
    const [hidePopupForm, setHidePopupForm] = useState(true)
    const togglePopupForm = () => setHidePopupForm(!hidePopupForm)
    const [form,setForm] = useState({
        categoria: '',
        nombre: '',
        imageURL: '',
        precio: '',
    })
    const { errors, validateForm, onBlurField } = useAddProductsAdmin(form);
    const ProductTypesOptions = []

    useEffect(() => {
        dispatch(
            fetchTrabajadoresStart()
        );

    }, [])
    
    ProductTypes.forEach(type => {
        ProductTypesOptions.push({
            value: type,
            name: type
        })
    })
    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value,
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

    const restetForm = () => {
        setHidePopupForm(true)
        setForm({    
            categoria: '',
            nombre: '',
            imageURL: '',
            precio: '',
        })
    }

    const onSubmitForm = e => {
        e.preventDefault();
        const { isValid } = validateForm({form, errors, forceTouchErrors: true});
        if (!isValid) return;
        console.log('all good')
        dispatch(addTrabajadorStart(form.categoria, form.nombre, form.imageURL, form.precio))
        restetForm()

    }

    return (
        <div className='insideAdminPanel'>
            <div className='listbuttons'>
                <LightBlueButton buttonclick={() => togglePopupForm()}>Añadir trabajador</LightBlueButton>
            </div>
            <PopupForm hidePopupForm={hidePopupForm} togglePopupForm={togglePopupForm}>
                <h1>Añadir trabajador</h1>
                <form onSubmit={onSubmitForm}>
                    <SelectLabel label={'Categorias'} selectOptions={ProductTypesOptions} selectDefault={'Seleccione una Categoria'} selectName={'categoria'} selectValue={form.categoria} selectBlur={onBlurField} selectChange={onUpdateField} errorform={errors.categoria.touched && errors.categoria.error ? true : null}/>
                    {errors.categoria.touched && errors.categoria.error ? (<Errordiv mensaje={errors.categoria.message} />) : null}
                    <InputLabel label={'Nombre'} inputtype={'text'} inputname={'nombre'} inputvalue={form.nombre} inputonBlur={onBlurField} inputonchange={onUpdateField} errorform={errors.nombre.touched && errors.nombre.error ? true : null}/>
                    {errors.nombre.touched && errors.nombre.error ? (<Errordiv mensaje={errors.nombre.message} />) : null}
                    <InputLabel label={'Imagen URL'} inputtype={'text'} inputname={'imageURL'} inputvalue={form.imageURL} inputonBlur={onBlurField} inputonchange={onUpdateField} errorform={errors.imageURL.touched && errors.imageURL.error ? true : null}/>
                    {errors.imageURL.touched && errors.imageURL.error ? (<Errordiv mensaje={errors.imageURL.message} />) : null}
                    <InputLabel label={'Precio'} inputtype={'number'} inputmin={'1'} inputname={'precio'} inputvalue={form.precio} inputonBlur={onBlurField} inputonchange={onUpdateField} errorform={errors.precio.touched && errors.precio.error ? true : null}/>
                    {errors.precio.touched && errors.precio.error ? (<Errordiv mensaje={errors.precio.message} />) : null}
                    <BlueButton type={'submit'}>Añadir trabajador</BlueButton>
                </form>
            </PopupForm>
            <div className='manageTrabjadores'>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <h1>
                                    Trabajadores
                                </h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table className='trabajadoresTable'>
                                    <tbody>
                                        {trabajadores.map((trabajador, index) => {
                                            const {
                                                categoria,
                                                imageURL,
                                                nombre,
                                                precio,
                                                documentID
                                            } = trabajador
                                            return(
                                                <tr>
                                                    <td>
                                                        <img src={imageURL} />
                                                    </td>
                                                    <td>
                                                        {categoria}
                                                    </td>
                                                    <td>
                                                        {nombre}
                                                    </td>
                                                    <td>
                                                        {precio} €
                                                    </td>
                                                    <td>
                                                        <RedButton buttonclick= {() => dispatch(deleteTrabjadorStart(documentID))}>Eliminar</RedButton>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AddProductsAdmin;