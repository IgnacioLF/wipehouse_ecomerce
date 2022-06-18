import CardProduct from '../components/ui/CardProduct';
import sample1 from '../assets/sample1.png'
import './Homepage.scss'
import { useNavigate} from 'react-router-dom'
import movilMockup from '../assets/movilMockup.png'
import dowloadGooglePlay from '../assets/dowloadGooglePlay.png'

const Homepage = () => {
    const navigate = useNavigate();

    const handleOnClickCard = (categoria) => {
        navigate(`search/${categoria}`);
    }

    return (
        <section className="homepage">
            <div className='about'>
                <div className='insideabout'>
                    <h1>Wipehouse</h1>
                    <p>Wipehouse es una plataforma dedicada a ofrecer servicios del hogar.
                         Permite conectar a trabajadores con clientes. En nuestra web podrás encontrar distintas categorías para los servicios que estés buscando.
                         Y en pocos clics podrás realizar tu pedido de manera sencilla y rápida. Si tienes algún problema no dudes en ponerte en contacto con nosotros </p>
                </div>
                <img loading='lazy' className='render' src={sample1} alt="Limpiador sample" />
            </div>
            <div className='productshome'>
                <CardProduct tittle={'Cocinero'} buttonOnClick={() => handleOnClickCard('Cocinero')} />
                <CardProduct tittle={'Limpieza del hogar'} buttonOnClick={() => handleOnClickCard('Limpieza del hogar')} />
                <CardProduct tittle={'Cortacesped'} buttonOnClick={() => handleOnClickCard('Cortacesped')} />
                <CardProduct tittle={'Mantenimiento de piscinas'} buttonOnClick={() => handleOnClickCard('Mantenimiento de piscinas')} />
            </div>
            <div className='mobileApp'>
                <a href='https://github.com/IgnacioLF/Wipehouse' target={'blank'}><img loading='lazy' className='mobileMockup' src={movilMockup} alt={'Wipehouse aplicación móvil'} /></a>
                <div className='insideMobile'>
                    <h2>Aplicación móvil</h2>
                    <p>También puedes disfrutar de nuestros servicios utilizando nuestra aplicación móvil. Donde podrás encontrar de forma rápida los trabajadores de tu comunidad autónoma.
                        Ademas puedes anunciarte tu mismo para realizar servicios del hogar.</p>
                    <a href='https://github.com/IgnacioLF/Wipehouse' target={'blank'}><img loading='lazy' src={dowloadGooglePlay} /></a>
                </div>
            </div>
        </section>
    )
}

export default Homepage;