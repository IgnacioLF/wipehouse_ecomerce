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

export const useAddCartItem = form => {
    const [errors, setErrors] = useState({
        quantity: {
            touched: false,
            error: false,
            message: '',
        },
    })

    const validateForm = (({form, field, errors, forceTouchErrors = false}) =>{
        let isValid = true;
        let nextErrors = JSON.parse(JSON.stringify(errors))
        if (forceTouchErrors) {nextErrors = touchErrors(errors)}
        const { quantity } = form;
        if (nextErrors.quantity.touched && (field ? field==='quantity' : true)){
            const quantityMessage = notEmpty(quantity, form);
            nextErrors.quantity.error = !!quantityMessage;
            nextErrors.quantity.message = quantityMessage;
            if (!!quantityMessage) isValid = false;
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