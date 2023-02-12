import React from 'react'
import PropTypes from 'prop-types'

function SelectField({
    value,
    label,
    error,
    onChange,
    options,
    name,
    defaultOption = 'Выберите...',
}) {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }
    if (!options) return null
    const optionsArray =
        typeof options === 'object' && !Array.isArray(options)
            ? Object.values(options)
            : options

    return (
        <div className="md-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className="form-select"
                id={name}
                onChange={handleChange}
                value={value}
                name={name}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.map((option) => (
                    <option value={option._id} key={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

SelectField.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    defaultOption: PropTypes.string,
    name: PropTypes.string.isRequired,
}

export default SelectField
