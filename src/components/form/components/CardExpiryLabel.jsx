import './CardExpiryLabel.scss'

const CardExpiryLabel = ({label, inputnameMM, inputnameYY, inputvalueMM, inputvalueYY, inputonchange, inputonBlur,errorform}) => {
    let spanClass = 'expiration'
    if (errorform){
        spanClass = 'expiration formfielderror'
    }
    
    return(
        <div className='insidewrap'>
            <label>{label}</label>
            <span className={spanClass}>
                <input type="text" name={inputnameMM} placeholder="MM" maxLength={'2'} size="2" value={inputvalueMM} onChange={inputonchange} onBlur={inputonBlur}/>
                <span>/</span>
                <input type="text" name={inputnameYY} placeholder="YY" maxLength={'2'} size="2" value={inputvalueYY} onChange={inputonchange} onBlur={inputonBlur}/>
            </span>
        </div>
    )
}

export default CardExpiryLabel