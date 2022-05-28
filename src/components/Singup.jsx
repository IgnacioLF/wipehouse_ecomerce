import { useState } from 'react'
import InputLabel from './form/components/InputLabel'
import './Singup.scss' 
import BlueButton from './ui/BlueButton'
import Errordiv from './ui/Errordiv'
import { useSingUpValidator } from './form/useSingupValidator'



const Singup = () => {
    const [form , setForm] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const { errors, validateForm, onBlurField } = useSingUpValidator(form);
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
    };
    const onSubmitForm = e => {
        e.preventDefault();
        const { isValid } = validateForm({form, errors, forceTouchErrors: true});
        if (!isValid) return;

        // TODO registro email con firebase
        alert(JSON.stringify(form, null, 2));
    };

    return (
        <div className='singup'>
            <div className='wrap'>
                <h2>Registrarse</h2>
                <form onSubmit={onSubmitForm}>
                    <InputLabel label={'Nombre'} inputtype='text' inputname={'nombre'} inputvalue={form.nombre} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.nombre.touched && errors.nombre.error ? true : null}/>
                    {errors.nombre.touched && errors.nombre.error ? (<Errordiv mensaje={errors.nombre.message} />) : null}
                    <InputLabel label={'Email'} inputtype='email' inputname={'email'} inputvalue={form.email} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.email.touched && errors.email.error ? true : null}/>
                    {errors.email.touched && errors.email.error ? (<Errordiv mensaje={errors.email.message}/>) : null}
                    <InputLabel label={'Contraseña'} inputtype='password' inputname={'password'} inputvalue={form.password} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.password.touched && errors.password.error ? true : null}/>
                    {errors.password.touched && errors.password.error ? (<Errordiv mensaje={errors.password.message} />) : null}
                    <InputLabel label={'Repetir contraseña'} inputtype='password' inputname={'confirmPassword'} inputvalue={form.confirmPassword} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.confirmPassword.touched && errors.confirmPassword.error ? true : null}/>
                    {errors.confirmPassword.touched && errors.confirmPassword.error ? (<Errordiv mensaje={errors.confirmPassword.message}/>) : null}
                    <BlueButton type={'submit'}>Registrarse</BlueButton>
                </form>
            </div>
        </div>
    )
}


/*
const Singup = () => {
    const [nombre,setNombre] = useState('');
    const [email,setEmail] = useState('');
    const [contrasena,setContrasena] = useState('');
    const [repcontrasena, setRepcontrasena] = useState('');
    const [error, setError] = useState('');
    const formvalidation = () => {
        if (nombre===''){
            setError(<Errordiv mensaje={'Error debe introducir un nombre'} />)
            return false
        }
    }
    /*
    meter error dentro del input 
    return (
        <div className='singup'>
            <div className='wrap'>
                <h2>Registrarse</h2>
                <form onSubmit={ev => {
                    if (formvalidation()===false){
                        ev.preventDefault();
                    }
                }}>
                    <InputLabel label={'Nombre'} inputtype='text' inputvalue={nombre} inputonchange={ev => setNombre(ev.target.nombre)} />
                    {error}
                    <InputLabel label={'Email'} inputtype='email' inputvalue={email} inputonchange={ev => setEmail(ev.target.email)}/>
                    <InputLabel label={'Contraseña'} inputtype='password' inputvalue={contrasena} inputonchange={ev => setContrasena(ev.target.contrasena)}/>
                    <InputLabel label={'Repetir contraseña'} inputtype='password' inputvalue={repcontrasena} inputonchange={ev => setRepcontrasena(ev.target.repcontrasena)}/>
                    <BlueButton type={'submit'}>Registrarse</BlueButton>
                </form>
            </div>
        </div>
    )
}
*/


export default Singup