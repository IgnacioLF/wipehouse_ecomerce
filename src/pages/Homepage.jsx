import CardProduct from '../components/ui/CardProduct';
import sample1 from '../assets/sample1.png'
import './Homepage.scss'

const Homepage = () => {

    return (
        <section className="homepage">
            <div className='about'>
                <div className='insideabout'>
                    <h1>Wipehouse</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nulla sagittis congue egestas. Aliquam dignissim nisi quam, vitae lacinia elit commodo ac. Sed sit amet tortor et enim pharetra consequat.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nulla sagittis congue egestas. Aliquam dignissim nisi quam, vitae lacinia elit commodo ac. Sed sit amet tortor et enim pharetra consequat</p>
                </div>
                <img className='render' src={sample1} alt="Limpiador sample" />
            </div>
            <div className='productshome'>
                <CardProduct tittle={'Cocinero'} />
                <CardProduct tittle={'Limpieza del hogar'} />
                <CardProduct tittle={'Cortacesped'} />
                <CardProduct tittle={'Mantenimiento de piscinas'} />
            </div>
        </section>
    )
}

export default Homepage;