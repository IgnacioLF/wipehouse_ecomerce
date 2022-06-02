import BlueButton from './ui/BlueButton';
import './AddProductsAdmin.scss'
import { useState } from 'react';
import PopupForm from './ui/PopupForm';
import InputLabel from './form/components/InputLabel'
import SelectLabel from './form/components/SelectLabel';
import { ProductTypes } from '../Utils';

const AddProductsAdmin = () => {
    const [hidePopupForm, setHidePopupForm] = useState(true)
    const togglePopupForm = () => setHidePopupForm(!hidePopupForm)
    const ProductTypesOptions = []
    ProductTypes.forEach(type => {
        ProductTypesOptions.push({
            value: type,
            name: type
        })
    })

    return (
        <>
            <div className='listbuttons'>
                <BlueButton buttonclick={() => togglePopupForm()}>Añadir trabajador</BlueButton>
            </div>
            <PopupForm hidePopupForm={hidePopupForm} togglePopupForm={togglePopupForm}>
                <h1>Añadir trabajador</h1>
                <SelectLabel label={'Categorias'} selectOptions={ProductTypesOptions} selectDefault={'Seleccione una Categoria'}/>
                <InputLabel label={'Nombre'} inputtype={'text'} />
                <InputLabel label={'Imagen URL'} inputtype={'text'} />
                <InputLabel label={'Precio'} inputtype={'number'} />
                <BlueButton>Añadir trabajador</BlueButton>
            </PopupForm>
        </>
    )
}

export default AddProductsAdmin;