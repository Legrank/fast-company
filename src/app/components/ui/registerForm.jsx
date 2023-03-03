import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../api'
import { getProfessionById, normalizeProfession } from '../../utils/professions'
import { getQualities, normalizeQualities } from '../../utils/qualities'
import FormComponent, {
    SelectField,
    RadioField,
    MultiSelectField,
    CheckBoxField,
    TextField,
} from '../common/form'

const RegisterForm = ({ toLogin }) => {
    const [data] = useState({})
    const [qualities, setQualities] = useState([])
    const [professions, setProfession] = useState([])

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(normalizeProfession(data))
        })
        api.qualities.fetchAll().then((data) => {
            setQualities(normalizeQualities(data))
        })
    }, [])

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
                message: 'Обязательно выберите вашу профессию',
            },
        },
        licence: {
            isRequired: {
                message:
                    'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
            },
        },
    }

    const handleSubmit = (data) => {
        const { profession: userProfession, qualities: userQualities } = data
        console.log({
            ...data,
            profession: getProfessionById(userProfession, professions),
            qualities: getQualities(userQualities, qualities),
        })
    }
    return (
        <>
            <h3 className="mb-4">Регистрация</h3>
            <FormComponent
                onSubmit={handleSubmit}
                validatorConfig={validatorConfig}
            >
                <TextField label="Электронная почта" name="email" />
                <TextField label="Пароль" type="password" name="password" />
                <SelectField
                    label="Выбери свою профессию"
                    defaultOption="Choose..."
                    options={professions}
                    name="profession"
                />
                <RadioField
                    options={[
                        { name: 'Male', value: 'male' },
                        { name: 'Female', value: 'female' },
                        { name: 'Other', value: 'other' },
                    ]}
                    name="sex"
                    label="Выберите ваш пол"
                />
                <MultiSelectField
                    options={qualities}
                    defaultValue={data.qualities}
                    name="qualities"
                    label="Выберите ваши качества"
                />
                <CheckBoxField name="licence">
                    Подтвердить <a>лицензионное соглашение</a>
                </CheckBoxField>
                <button className="btn btn-primary w-100 mx-auto" type="submit">
                    Submit
                </button>
            </FormComponent>
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
