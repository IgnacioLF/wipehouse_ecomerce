/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { emailValidator, passwordValidator, confirmPasswordValidator, nombreValidator } from "./Validators";

// loops trought object to set touched true (forcevalidation on submit)
const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            touched: true, 
        }
        return acc;
    }, {})
}

export const useSingUpValidator = form => {
    const [errors, setErrors] = useState({
        nombre: {
            touched: false,
            error: false,
            message: "",
        },
        email: {
            touched: false,
            error: false,
            message: "",
        },
        password: {
            touched: false,
            error: false,
            message: "",
        },
        confirmPassword: {
            touched: false,
            error: false,
            message: "",
        },
    })
    /**
     * for each field validator checks if the field was interacted with and compares it with the file argument . field value is used to check which validator should run
     * @param {form} form from state 
     * @param {field}  name of the field that is validated
     * @param {errors} object errors 
     * @param {forceTouchErrors} boolean flag whether all fields should be set  to touched before validating the errors
     * @returns 
     */
    const validateForm = ({form, field, errors, forceTouchErrors = false}) =>{
        let isValid = true;

        // create a copy of the errors
        let nextErrors = JSON.parse(JSON.stringify(errors))

        // force validate all the fields
        if (forceTouchErrors){
            nextErrors = touchErrors(errors)
        }

        const {nombre,email, password, confirmPassword} = form;

        if (nextErrors.nombre.touched && (field ? field==='nombre' : true)){
            const nombreMenssage = nombreValidator(nombre, form);
            nextErrors.nombre.error = !!nombreMenssage;
            nextErrors.nombre.message = nombreMenssage;
            if (!!nombreMenssage) isValid = false;
        }
        if (nextErrors.email.touched && (field ? field==='email' : true)){
            const emailMenssage = emailValidator(email, form);
            nextErrors.email.error = !!emailMenssage;
            nextErrors.email.message = emailMenssage;
            if (!!emailMenssage) isValid = false;
        }
        if (nextErrors.password.touched && (field ? field === "password" : true)) {
            const passwordMessage = passwordValidator(password, form);
            nextErrors.password.error = !!passwordMessage;
            nextErrors.password.message = passwordMessage;
            if (!!passwordMessage) isValid = false;
        }
        if (nextErrors.confirmPassword.touched && (field ? field === 'confirmPassword' : true)) {
            const confirmPasswordMessage = confirmPasswordValidator(confirmPassword,form);
            nextErrors.confirmPassword.error = !!confirmPasswordMessage;
            nextErrors.confirmPassword.message = confirmPasswordMessage;
            if (!!confirmPasswordMessage) isValid = false;
        }
        setErrors(nextErrors);
        return {isValid,errors: nextErrors}
    }
    
    // checks if the field that is blured is toched 
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

