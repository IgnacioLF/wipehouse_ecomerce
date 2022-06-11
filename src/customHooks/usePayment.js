/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { notEmpty, apellidosValidator, dniValidator, nombreValidator, cpValidator, telefonoValidator, tarjetaValidator, ccvValidator, expiryMMValidator, expiryYYValidator } from "../components/form/Validators.js";

const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            touched: true, 
        }
        return acc;
    }, {})
}

export const usePayment = form => {
    const [errors, setErrors] = useState({
        nombre: {
            touched: false,
            error: false,
            message: "",
        },
        apellidos: {
            touched: false,
            error: false,
            message: "",
        },
        dni: {
            touched: false,
            error: false,
            message: "",
        },
        telefono: {
            touched: false,
            error: false,
            message: "",
        },
        provincia: {
            touched: false,
            error: false,
            message: "",
        },
        cp: {
            touched: false,
            error: false,
            message: "",
        },
        direccion: {
            touched: false,
            error: false,
            message: "",
        },
        tarjeta: {
            touched: false,
            error: false,
            message: "",
        },
        ccv: {
            touched: false,
            error: false,
            message: "",
        },
        expiryMM: {
            touched: false,
            error: false,
            message: "",
        },
        expiryYY: {
            touched: false,
            error: false,
            message: "",
        }
    })

    const validateForm = ({form, field, errors, forceTouchErrors = false}) =>{
        let isValid = true;
        // create a copy of the errors
        let nextErrors = JSON.parse(JSON.stringify(errors))
        // force validate all the fields
        if (forceTouchErrors){
            nextErrors = touchErrors(errors)
        }
        const {nombre, apellidos, dni, telefono, provincia, cp, direccion, tarjeta, ccv, expiryMM, expiryYY} = form;

        if (nextErrors.nombre.touched && (field ? field==='nombre' : true)){
            const nombreMenssage = nombreValidator(nombre, form);
            nextErrors.nombre.error = !!nombreMenssage;
            nextErrors.nombre.message = nombreMenssage;
            if (!!nombreMenssage) isValid = false;
        }
        if (nextErrors.apellidos.touched && (field ? field==='apellidos' : true)){
            const apellidosMenssage = apellidosValidator(apellidos, form);
            nextErrors.apellidos.error = !!apellidosMenssage;
            nextErrors.apellidos.message = apellidosMenssage;
            if (!!apellidosMenssage) isValid = false;
        }
        if (nextErrors.dni.touched && (field ? field==='dni' : true)){
            const dniMenssage = dniValidator(dni, form);
            nextErrors.dni.error = !!dniMenssage;
            nextErrors.dni.message = dniMenssage;
            if (!!dniMenssage) isValid = false;
        }
        if (nextErrors.telefono.touched && (field ? field==='telefono' : true)){
            const telefonoMenssage = telefonoValidator(telefono, form);
            nextErrors.telefono.error = !!telefonoMenssage;
            nextErrors.telefono.message = telefonoMenssage;
            if (!!telefonoMenssage) isValid = false;
        }
        if (nextErrors.provincia.touched && (field ? field==='provincia' : true)){
            const provinciaMenssage = notEmpty(provincia, form);
            nextErrors.provincia.error = !!provinciaMenssage;
            nextErrors.provincia.message = provinciaMenssage;
            if (!!provinciaMenssage) isValid = false;
        }
        if (nextErrors.cp.touched && (field ? field==='cp' : true)){
            const cpMenssage = cpValidator(cp, form);
            nextErrors.cp.error = !!cpMenssage;
            nextErrors.cp.message = cpMenssage;
            if (!!cpMenssage) isValid = false;
        }
        if (nextErrors.direccion.touched && (field ? field==='direccion' : true)){
            const direccionMenssage = notEmpty(direccion, form);
            nextErrors.direccion.error = !!direccionMenssage;
            nextErrors.direccion.message = direccionMenssage;
            if (!!direccionMenssage) isValid = false;
        }
        if (nextErrors.tarjeta.touched && (field ? field==='tarjeta' : true)){
            const tarjetaMenssage = tarjetaValidator(tarjeta, form);
            nextErrors.tarjeta.error = !!tarjetaMenssage;
            nextErrors.tarjeta.message = tarjetaMenssage;
            if (!!tarjetaMenssage) isValid = false;
        }
        if (nextErrors.ccv.touched && (field ? field==='ccv' : true)){
            const ccvMenssage = ccvValidator(ccv, form);
            nextErrors.ccv.error = !!ccvMenssage;
            nextErrors.ccv.message = ccvMenssage;
            if (!!ccvMenssage) isValid = false;
        }
        if (nextErrors.expiryMM.touched && (field ? field==='expiryMM' : true)){
            const expiryMMMenssage = expiryMMValidator(expiryMM, form);
            nextErrors.expiryMM.error = !!expiryMMMenssage;
            nextErrors.expiryMM.message = expiryMMMenssage;
            if (!!expiryMMMenssage) isValid = false;
        }
        if (nextErrors.expiryYY.touched && (field ? field==='expiryYY' : true)){
            const expiryYYMenssage = expiryYYValidator(expiryYY, form);
            nextErrors.expiryYY.error = !!expiryYYMenssage;
            nextErrors.expiryYY.message = expiryYYMenssage;
            if (!!expiryYYMenssage) isValid = false;
        }

        setErrors(nextErrors);
        return {isValid,errors: nextErrors}
    }

    const onBlurField = e => {
        const field = e.target.name;
        const fieldError = errors[field];
        if (fieldError.touched) return;
        const updatedErrors = {
            ...errors,
            [field]: {
                ...errors[field],
                touched: true,
            }
        }
        validateForm({form, field, errors: updatedErrors});
    }

    return { validateForm,onBlurField,errors}
}