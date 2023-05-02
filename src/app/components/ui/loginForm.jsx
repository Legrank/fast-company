import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { validator } from '../../utils/validator'
import FormComponent, { CheckBoxField, TextField } from '../common/form'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthError, login } from '../../store/users'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const LoginForm = ({ toRegister }) => {
    const history = useHistory()
    const dispath = useDispatch()
    const [data] = useState({ email: '', password: '', stayOn: false })
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
    const loginError = useSelector(getAuthError())
    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (data) => {
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/'
        dispath(login({ payload: data, redirect }))
    }
    return (
        <>
            <h3 className="mb-4">Login</h3>
            <FormComponent
                validatorConfig={validatorConfig}
                onSubmit={handleSubmit}
                newError={{ password: loginError }}
            >
                <TextField label="Электронная почта" name="email" />
                <TextField label="Пароль" type="password" name="password" />
                <CheckBoxField name="stayOn">Оставаться в сети</CheckBoxField>
                <button className="btn btn-primary w-100 mx-auto" type="submit">
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
