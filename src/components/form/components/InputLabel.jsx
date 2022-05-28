import './InputLabel.scss'

const InputLabel = ({label,inputtype,inputvalue,inputonchange,inputname,inputonBlur,errorform}) => {
    if (errorform){
        errorform = 'formfielderror'
    }
    
    return (
        <div className='insidewrap'>
            <label>{label}</label>
            <input className={errorform} type={inputtype} value={inputvalue} onChange={inputonchange} name={inputname} onBlur={inputonBlur}></input>
        </div>
    )
}

export default InputLabel