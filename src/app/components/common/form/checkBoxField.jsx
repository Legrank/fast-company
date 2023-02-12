import React from 'react'
import PropTypes from 'prop-types'

function CheckBoxField({ name, value, onChange, children, error }) {
    const handleChange = () => {
        onChange({ name, value: !value })
    }
    const getInputClasses = () =>
        'form-check-input' + (error ? ' is-invalid' : '')
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                value=""
                id={name}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

CheckBoxField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    error: PropTypes.string,
}

export default CheckBoxField
