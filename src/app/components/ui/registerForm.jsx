import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import SelectField from '../common/form/selectField'
import api from '../../api'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = ({ toLogin }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'Male',
        qualities: [],
        licence: false,
    })
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState()
    const [qualities, setQualities] = useState({})
    const handleChange = (data) => {
        setData((prevState) => ({
            ...prevState,
            [data.name]: data.value,
        }))
    }
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
        profession: {
            isRequired: {
                message: 'Выбирите свою профессию',
            },
        },
        licence: {
            isRequired: {
                message: 'Согласитесь с лицензионным соглагением',
            },
        },
    }
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
        api.qualities.fetchAll().then((data) => setQualities(data))
    }, [])
    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }
    return (
        <>
            <h3 className="mb-4">Регистрация</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <SelectField
                    options={professions}
                    onChange={handleChange}
                    label={'Выбирите свою профессию'}
                    name={'profession'}
                    value={data.profession}
                    error={errors.profession}
                />
                <RadioField
                    options={[
                        { name: 'Male', value: 'male' },
                        { name: 'Female', value: 'female' },
                        { name: 'Other', value: 'other' },
                    ]}
                    onChange={handleChange}
                    label={'Укажите ваш пол'}
                    name={'sex'}
                    value={data.sex}
                />
                <MultiSelectField
                    options={qualities}
                    label="Ваши качества"
                    onChange={handleChange}
                    name="qualities"
                    defaultValue={data.qualities}
                />
                <CheckBoxField
                    value={data.licence}
                    name="licence"
                    onChange={handleChange}
                    error={errors.licence}
                >
                    Подтвердить лицензионное соглашение
                </CheckBoxField>
                <button
                    className="btn btn-primary w-100 mx-auto"
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
            <p>
                Уже есть аккаунт? <a onClick={toLogin}>Войдите</a>
            </p>
        </>
    )
}

RegisterForm.propTypes = {
    toLogin: PropTypes.func.isRequired,
}

export default RegisterForm
