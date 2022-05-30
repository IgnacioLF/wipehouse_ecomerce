import BlueButton from './ui/BlueButton';
import './Singin.scss';
import { singInWithGoogle, auth } from '../firebase/utils';
import { useState, useEffect } from 'react';
import Errordiv from './ui/Errordiv'
import { Navigate } from 'react-router-dom';
import InputLabel from './form/components/InputLabel';
import { useSinginValidator } from '../customHooks/useSinginValidator';
import { async } from '@firebase/util';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../redux/User/user.actions.js'

const mapState = ({ user }) => ({
    singInError: user.singInError
});

const Singin = () =>{
    const { singInError } = useSelector(mapState)
    const dispatch = useDispatch();
    const [currentUser,setcurrentUser] = useState(auth.currentUser)
    const [submitError, setSubmitError] = useState('')
        const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const {errors, validateForm, onBlurField } = useSinginValidator(form);

    useEffect(() => {
        setSubmitError(singInError)
    }, [singInError])

    auth.onAuthStateChanged(userAuth =>{
        setcurrentUser(auth.currentUser)
    })

    const onUpdateField= (e) => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value
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
    const onSubmitForm = async (e) => {
        e.preventDefault();
        const { isValid } = validateForm({form, errors, forceTouchErrors: true});
        if (!isValid) return;
        dispatch(signInUser(form.email,form.password));
    }
    
    return (
    <div className='singin'>
        { currentUser &&(<Navigate to="/"/>)}
        <div className='wrap'>
            <h2>Login</h2>
            <div className='formWrap'>
                <form onSubmit={onSubmitForm}>
                    <InputLabel label={'Email'} inputtype={'email'} inputname={'email'} inputvalue={form.email} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.email.touched && errors.email.error ? true : null} />
                    {errors.email.touched && errors.email.error ? (<Errordiv mensaje={errors.email.message} />) : null}
                    <InputLabel label={'Contraseña'} inputtype={'password'} inputname={'password'} inputvalue={form.password} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.password.touched && errors.password.error ? true : null}/>
                    {errors.password.touched && errors.password.error ? (<Errordiv mensaje={errors.password.message} />) : null}
                    {submitError ? (<Errordiv mensaje={submitError} />) : null}
                    <BlueButton type={'submit'}>Login</BlueButton>
                </form>
                <BlueButton type={'button'} buttonclick={()=> {singInWithGoogle()}}>Sing in with Goole</BlueButton>
            </div>
        </div>
    </div>)
}

export default Singin;