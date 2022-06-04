import './RedButton.scss'

const RedButton = ({type,children,buttonclick}) =>{
    return(<button className='redButton' type={type} onClick={buttonclick}>{children}</button>)
}

export default RedButton;