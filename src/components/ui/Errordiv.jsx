import './Errordiv.scss'
import "bootstrap-icons/font/bootstrap-icons.css";

const Errordiv = ({mensaje}) => {

    return (
        <div className='error'>
            <i className="bi bi-exclamation-diamond-fill"></i> {mensaje}
        </div>
    )
}

export default Errordiv;