import BlueButton from './ui/BlueButton';
import './AddProductsAdmin.scss'
import { useState } from 'react';
import PopupForm from './ui/PopupForm';
import InputLabel from './form/components/InputLabel'
import SelectLabel from './form/components/SelectLabel';
import { ProductTypes } from '../Utils';
import { useAddProductsAdmin } from '../customHooks/useAddProductsAdmin';
import Errordiv from './ui/Errordiv'

const AddProductsAdmin = () => {
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
    const onSubmitForm = e => {
        e.preventDefault();
        const { isValid } = validateForm({form, errors, forceTouchErrors: true});
        if (!isValid) return;
        console.log('all good')
        // TODO subir trabajador a firebase
    }

    return (
        <>
            <div className='listbuttons'>
                <BlueButton buttonclick={() => togglePopupForm()}>Añadir trabajador</BlueButton>
            </div>
            <PopupForm hidePopupForm={hidePopupForm} togglePopupForm={togglePopupForm}>
                <h1>Añadir trabajador</h1>
                <form onSubmit={onSubmitForm}>
                    <SelectLabel label={'Categorias'} selectOptions={ProductTypesOptions} selectDefault={'Seleccione una Categoria'} selectName={'categoria'} selectValue={form.categoria} selectBlur={onBlurField} selectChange={onUpdateField} errorform={errors.categoria.touched && errors.categoria.error ? true : null}/>
                    {errors.categoria.touched && errors.categoria.error ? (<Errordiv mensaje={errors.categoria.message} />) : null}
                    <InputLabel label={'Nombre'} inputtype={'text'} inputname={'nombre'} inputvalue={form.nombre} inputonBlur={onBlurField} inputonchange={onUpdateField} errorform={errors.nombre.touched && errors.nombre.error ? true : null}/>
                    {errors.nombre.touched && errors.nombre.error ? (<Errordiv mensaje={errors.nombre.message} />) : null}
                    <InputLabel label={'Imagen URL'} inputtype={'text'} inputname={'imageURL'} inputvalue={form.imagenURL} inputonBlur={onBlurField} inputonchange={onUpdateField} errorform={errors.imageURL.touched && errors.imageURL.error ? true : null}/>
                    {errors.imageURL.touched && errors.imageURL.error ? (<Errordiv mensaje={errors.imageURL.message} />) : null}
                    <InputLabel label={'Precio'} inputtype={'number'} inputmin={'1'} inputname={'precio'} inputvalue={form.precio} inputonBlur={onBlurField} inputonchange={onUpdateField} errorform={errors.precio.touched && errors.precio.error ? true : null}/>
                    {errors.precio.touched && errors.precio.error ? (<Errordiv mensaje={errors.precio.message} />) : null}
                    <BlueButton type={'submit'}>Añadir trabajador</BlueButton>
                </form>
            </PopupForm>
        </>
    )
}

export default AddProductsAdmin;