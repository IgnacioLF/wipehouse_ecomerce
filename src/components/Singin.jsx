import BlueButton from './ui/BlueButton';
import './Singin.scss';
import { singInWithGoogle } from '../firebase/utils';

const Singin = () =>{
    return (
    <div className='singin'>
        <div className='wrap'>
            <h2>Login</h2>
            <div className='formWrap'>
                <form onSubmit={ev =>{
                    ev.preventDefault()
                    singInWithGoogle()
                }}>
                    <BlueButton >Sing in with Goole</BlueButton>
                </form>
            </div>
        </div>
    </div>)
}

export default Singin;