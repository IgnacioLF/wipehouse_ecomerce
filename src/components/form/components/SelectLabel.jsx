import './SelectLabel.scss'

const SelectLabel = ({label,selectChange,selectOptions,selectDefault}) => {
    return (
        <div className='insidewrap'>
            <label>{label}</label>
            <select onChange={selectChange}>
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