import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import { validator } from '../../../utils/validator'

function FormComponent({ children, validatorConfig, onSubmit, defaultData }) {
    const handleChange = useCallback((data) => {
        setData((prevState) => ({
            ...prevState,
            [data.name]: data.value,
        }))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(data)
    }
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            const form = e.target.form
            const indexField = Array.prototype.indexOf.call(form, e.target)
            form.elements[indexField + 1].focus()
        }
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const [data, setData] = useState(defaultData || {})
    const [errors, setErrors] = useState({})
    const isValid = Object.keys(errors).length === 0
    const cloneElements = React.Children.map(children, (child) => {
        const childType = typeof child.type
        if (childType === 'object') {
            if (!child.props.name) {
                throw new Error('Name is required for field', child)
            }
            return React.cloneElement(child, {
                onChange: handleChange,
                onKeyDown: handleKeyDown,
                value: data[child.props.name],
                error: errors[child.props.name],
            })
        }
        if (childType === 'string') {
            if (child.type === 'button') {
                if (
                    child.props.type === 'submit' ||
                    child.props.type === undefined
                ) {
                    return React.cloneElement(child, { disabled: !isValid })
                }
            }
        }
        return child
    })

    useEffect(() => {
        validate()
    }, [data])
    return <form onSubmit={handleSubmit}>{cloneElements}</form>
}

FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    validatorConfig: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    defaultData: PropTypes.object,
}

export default FormComponent
