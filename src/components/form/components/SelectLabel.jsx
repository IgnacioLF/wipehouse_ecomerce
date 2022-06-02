import './SelectLabel.scss'

const SelectLabel = ({label,selectChange,selectOptions,selectDefault,selectValue,selectName,selectBlur,errorform}) => {
    if (errorform){
        errorform = 'formfielderror'
    }

    return (
        <div className='insidewrap'>
            <label>{label}</label>
            <select className={errorform} onChange={selectChange} value={selectValue} name={selectName} onBlur={selectBlur} >
                <option value={''}>{selectDefault}</option>
                {selectOptions.map((option, index) => {
                const { value, name } = option;
                return (
                    <option key={index} value={value}>{name}</option>
                );
                })}
            </select>
        </div>
    )
}

export default SelectLabel;