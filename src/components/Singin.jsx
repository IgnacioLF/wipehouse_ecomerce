import BlueButton from './ui/BlueButton';
import './Singin.scss';
import { singInWithGoogle,auth } from '../firebase/utils';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Singin = () =>{
    const [currentUser,setcurrentUser] = useState(auth.currentUser)
    auth.onAuthStateChanged(userAuth =>{
        setcurrentUser(auth.currentUser)
    })
    return (
    <div className='singin'>
        { currentUser &&(<Navigate to="/"/>)}
        <div className='wrap'>
            <h2>Login</h2>
            <div className='formWrap'>
                <form onSubmit={ev =>{
                    ev.preventDefault()
                    singInWithGoogle()
                }}>
                    <BlueButton type={'submit'}>Sing in with Goole</BlueButton>
                </form>
            </div>
        </div>
    </div>)
}

export default Singin;