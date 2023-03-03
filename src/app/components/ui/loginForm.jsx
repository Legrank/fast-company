import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { validator } from '../../utils/validator'
import FormComponent, { CheckBoxField, TextField } from '../common/form'

const LoginForm = ({ toRegister }) => {
    const [data] = useState({ email: '', password: '', stayOn: false })
    const [errors, setErrors] = useState({})
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения',
            },
            isEmail: {
                message: 'Email введен некорректно',
            },
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения',
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву',
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одно число',
            },
            min: {
                message: 'Пароль должен состоять минимум из 8 символов',
                value: 8,
            },
        },
    }
    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (data) => {
        console.log(data)
    }
    return (
        <>
            <h3 className="mb-4">Login</h3>
            <FormComponent
                validatorConfig={validatorConfig}
                onSubmit={handleSubmit}
            >
                <TextField label="Электронная почта" name="email" />
                <TextField label="Пароль" type="password" name="password" />
                <CheckBoxField name="stayOn">Оставаться в сети</CheckBoxField>
                <button
                    className="btn btn-primary w-100 mx-auto"
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </FormComponent>
            <p>
                Нет аккаунта? <a onClick={toRegister}>Зарегистрируйтесь.</a>
            </p>
        </>
    )
}

LoginForm.propTypes = {
    toRegister: PropTypes.func.isRequired,
}

export default LoginForm
