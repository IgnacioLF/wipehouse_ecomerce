import './BlueButton.scss'

const BlueButton = ({type,children}) =>{
    return(<button className='bluebuttom' type={type}>{children}</button>)
}

export default BlueButton;