import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { validator } from '../../utils/validator'
import FormComponent, { CheckBoxField, TextField } from '../common/form'
import { useAuth } from '../../hooks/useAuth'

const LoginForm = ({ toRegister }) => {
    const history = useHistory()
    const [data] = useState({ email: '', password: '', stayOn: false })
    const [newError, setNewError] = useState({})
    const { signIn } = useAuth()
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
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (data) => {
        setNewError({})
        try {
            await signIn(data)
            history.push('/')
        } catch (error) {
            setNewError(error)
        }
    }
    return (
        <>
            <h3 className="mb-4">Login</h3>
            <FormComponent
                validatorConfig={validatorConfig}
                onSubmit={handleSubmit}
                newError={newError}
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
