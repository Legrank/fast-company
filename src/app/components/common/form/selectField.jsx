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
    ...rest
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
                {...rest}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

SelectField.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    defaultOption: PropTypes.string,
    name: PropTypes.string.isRequired,
}

export default React.memo(SelectField)
