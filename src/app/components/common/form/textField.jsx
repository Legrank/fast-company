import React, { useState } from 'react'
import PropTypes from 'prop-types'

function TextField({ value, label, name, type = 'text', error, onChange }) {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }
    const toggleShowPassword = () => setShowPassword((prev) => !prev)
    const [showPassword, setShowPassword] = useState(false)
    const getInputClasses = () => 'form-control' + (error ? ' is-invalid' : '')
    return (
        <div className="md-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group">
                <input
                    type={showPassword ? 'text' : type}
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
                {type === 'password' && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                'bi bi-eye' + (showPassword ? '-slash' : '')
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}

TextField.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default TextField
