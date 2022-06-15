import './Footer.scss'
import Logo from '../assets/logo.png'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <footer>
            <div className='leftFooter'>
                <div className='footerlogo'>
                    <Link to={'/'}>
                        <img src={Logo}/>
                    </Link>
                </div>
                <div className='lineFooter'></div>
                <div>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/search'}>Buscar</Link></li>
                    </ul>
                    <p> © 2022 Wipehouse.  All rights reserved</p>
                </div>
            </div>
            <div className='rightFooter'>
                <div>
                    <a href='https://twitter.com/' target={'blank'}><i className="bi bi-twitter"></i></a>
                    <a href='https://www.youtube.com/' target={'blank'}><i className="bi bi-youtube"></i></a>
                    <a href='https://www.instagram.com/' target={'blank'}><i className="bi bi-instagram"></i></a>
                    <a href='https://www.whatsapp.com/?lang=es' target={'blank'}><i className="bi bi-whatsapp"></i></a>
                </div> 
                <p>Soporte: Wipehouse@gmail.com</p>
            </div>
        </footer>
    )
}

export default Footer