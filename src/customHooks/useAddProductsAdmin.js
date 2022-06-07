/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { notEmpty } from "../components/form/Validators";

const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            touched: true,
        }
        return acc
    }, {})
}

export const useAddProductsAdmin = form => {
    const [errors, setErrors] = useState({
        categoria: {
            touched: false,
            error: false,
            message: '',
        },
        nombre: {
            touched: false,
            error: false,
            message: '',
        },
        imageURL: {
            touched: false,
            error: false,
            message: '',
        },
        precio: {
            touched: false,
            error: false,
            message: '',
        },
        descripcion: {
            touched: false,
            error: false,
            message: '',
        }
    })

    const validateForm = (({form, field, errors, forceTouchErrors = false}) =>{
        let isValid = true;
        let nextErrors = JSON.parse(JSON.stringify(errors))
        if (forceTouchErrors) {nextErrors = touchErrors(errors)}
        const { categoria, nombre, imageURL, precio, descripcion} = form;
        if (nextErrors.categoria.touched && (field ? field==='categoria' : true)){
            const categoriaMessage = notEmpty(categoria, form);
            nextErrors.categoria.error = !!categoriaMessage;
            nextErrors.categoria.message = categoriaMessage;
            if (!!categoriaMessage) isValid = false;
        }
        if (nextErrors.nombre.touched && (field ? field==='nombre' : true)){
            const nombreMessage = notEmpty(nombre, form);
            nextErrors.nombre.error = !!nombreMessage;
            nextErrors.nombre.message = nombreMessage;
            if (!!nombreMessage) isValid = false;
        }
        if (nextErrors.imageURL.touched && (field ? field==='imageURL' : true)){
            const imageURLMessage = notEmpty(imageURL, form);
            nextErrors.imageURL.error = !!imageURLMessage;
            nextErrors.imageURL.message = imageURLMessage;
            if (!!imageURLMessage) isValid = false;
        }
        if (nextErrors.precio.touched && (field ? field==='precio' : true)){
            const precioMessage = notEmpty(precio, form);
            nextErrors.precio.error = !!precioMessage;
            nextErrors.precio.message = precioMessage;
            if (!!precioMessage) isValid = false;
        }
        if (nextErrors.descripcion.touched && (field ? field==='descripcion' : true)){
            const descripcionMessage = notEmpty(descripcion, form);
            nextErrors.descripcion.error = !!descripcionMessage;
            nextErrors.descripcion.message = descripcionMessage;
            if (!!descripcionMessage) isValid = false;
        }
        setErrors(nextErrors);
        return  {isValid,errors: nextErrors}
    })

    const onBlurField = e => {
        const field = e.target.name;
        const fieldError = errors[field]
        if (fieldError.touched) return;
        const updateErrors = {
            ...errors,
            [field]: {
                ...errors[field],
                touched: true,
            }
        }
        validateForm({form, field, errors: updateErrors});
    }

    return { validateForm,onBlurField,errors}
}