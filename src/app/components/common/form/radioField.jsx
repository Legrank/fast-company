import React from 'react'
import PropTypes from 'prop-types'

function RadioField({ value, label, onChange, options, name }) {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            {options.map((option) => (
                <div
                    className="form-check form-check-inline"
                    key={option.name + '_' + option.value}
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        id={option.name + '_' + option.value}
                        value={option.value}
                        onChange={handleChange}
                        name={name}
                        checked={option.value === value}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={option.name + '_' + option.value}
                    >
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    )
}

RadioField.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
}

export default RadioField
