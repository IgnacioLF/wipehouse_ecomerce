import './BlueButton.scss'

const BlueButton = ({type,children,buttonclick}) =>{
    return(<button className='bluebuttom' type={type} onClick={buttonclick}>{children}</button>)
}

export default BlueButton;