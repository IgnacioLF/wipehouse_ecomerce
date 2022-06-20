import { useEffect, useState } from 'react'
import InputLabel from './form/components/InputLabel'
import './Signup.scss' 
import BlueButton from './ui/BlueButton'
import Errordiv from './ui/Errordiv'
import { useSignUpValidator } from '../customHooks/useSignupValidator';
import { auth } from '../firebase/utils';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserStart } from '../redux/User/user.actions'

const mapState = ({ user }) => ({
    signUpError: user.signUpError
});

const Signup = () => {
    const [currentUser,setcurrentUser] = useState(auth.currentUser)
    const [form , setForm] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const { errors, validateForm, onBlurField } = useSignUpValidator(form);
    const { signUpError } = useSelector(mapState)
    const dispatch = useDispatch();
    const [submitError, setSubmitError] = useState('')

    useEffect(() => {
        setSubmitError(signUpError)
    } , [signUpError])

    auth.onAuthStateChanged(userAuth =>{
        setcurrentUser(auth.currentUser)
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
    };

    const onSubmitForm = e => {
        e.preventDefault();
        const { isValid } = validateForm({form, errors, forceTouchErrors: true});
        if (!isValid) return;
        dispatch(signUpUserStart(form.nombre, form.email, form.password))
    };

    return (
        <div className='signup'>
            { currentUser &&(<Navigate to="/"/>)}
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
                    {submitError ? (<Errordiv mensaje={submitError} />) : null}
                    <BlueButton type={'submit'}>Registrarse</BlueButton>
                </form>
            </div>
        </div>
    )
}

export default Signup