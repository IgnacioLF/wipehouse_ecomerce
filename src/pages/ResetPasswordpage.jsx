/* eslint-disable no-extra-boolean-cast */
import { useState } from "react"
import BlueButton from "../components/ui/BlueButton"
import InputLabel from "../components/form/components/InputLabel";
import { emailValidator } from "../components/form/Validators";
import Errordiv from "../components/ui/Errordiv";
import './ResetPasswordpage.scss'
import { sendResetPassword } from "../firebase/utils";
import { async } from "@firebase/util";
import "bootstrap-icons/font/bootstrap-icons.css";

const ResetPasswordpage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState({
        error: false,
        message: ''
    });
    const [sendEmail, setSendEmail] = useState('')
    let isValid = true;

    const onBlurField = ev => {
        validaeEmail()
    }

    const validaeEmail = () => {
        isValid = true
        const emailMenssage = emailValidator(email);
        setError({
            error: !!emailMenssage,
            message: emailMenssage,
        }) 
        if (!!emailMenssage) isValid = false;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        validaeEmail()
        if (!isValid) return
        try {
           setSendEmail(await sendResetPassword(email))
        } catch (error) {
            if (error.code === 'auth/user-not-found') setError({error: true, message: 'El correo introducido no esta registrado'})
            else setError({error: true, message: 'Ocurrió un error al realizar la operación'})
        }
    }

    return (
        <div className="resetPasswordpage">
            <div className="wrap">
                <h2>Recuperar contraseña</h2>
                <form onSubmit={onSubmit}>
                    <InputLabel label={'Email'} inputtype={'email'} inputname={'email'} inputvalue={email.value} inputonchange={ev => setEmail(ev.target.value)} inputonBlur={onBlurField} errorform={error.error ? true : null} />
                    {error.error ? (<Errordiv mensaje={error.message} />) : null}
                    {sendEmail ? (<div className="sendEmail"><div><i className="bi bi-check-circle-fill"></i>Correo Enviado</div></div>) : null}
                    <BlueButton type={'submit'}>Recuperar</BlueButton>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordpage