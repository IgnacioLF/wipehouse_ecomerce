import './LightBlueButton.scss'

const LightBlueButton = ({type,children,buttonclick}) =>{
    return(<button className='lightbluebuttom' type={type} onClick={buttonclick}>{children}</button>)
}

export default LightBlueButton;