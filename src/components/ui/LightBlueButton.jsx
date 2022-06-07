import './LightBlueButton.scss'

const LightBlueButton = ({type,children,buttonclick,buttonName}) =>{
    return(<button className='lightbluebuttom' type={type} onClick={buttonclick} name={buttonName}>{children}</button>)
}

export default LightBlueButton;