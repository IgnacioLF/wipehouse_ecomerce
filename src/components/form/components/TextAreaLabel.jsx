import './TextAreaLabel.scss'

const TextAreaLabel = ({label,textareavalue,textareaonchange,textareaname,textareaonBlur,errorform}) => {
    if (errorform){
        errorform = 'formfielderror'
    }

    return(
        <div className='insidewrap'>
            <label>{label}</label>
            <textarea className={errorform} value={textareavalue} onChange={textareaonchange} name={textareaname} onBlur={textareaonBlur}></textarea>
        </div>
    )
}

export default TextAreaLabel