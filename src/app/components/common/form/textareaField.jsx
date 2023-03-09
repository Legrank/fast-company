import React from 'react'
import PropTypes from 'prop-types'

function TextareaField({ value = '', label, name, error, onChange, ...rest }) {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }
    const getInputClasses = () => 'form-control' + (error ? ' is-invalid' : '')
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group">
                <textarea
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                ></textarea>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}
TextareaField.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func,
}

export default React.memo(TextareaField)
