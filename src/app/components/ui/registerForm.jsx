import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { normalizeProfession } from '../../utils/professions'
import { normalizeQualities } from '../../utils/qualities'
import FormComponent, {
    SelectField,
    RadioField,
    MultiSelectField,
    CheckBoxField,
    TextField,
} from '../common/form'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { getQualities } from '../../store/qualities'
import { getProfessions } from '../../store/professions'

const RegisterForm = ({ toLogin }) => {
    const history = useHistory()
    const [data] = useState({})
    const qualitys = useSelector(getQualities())
    const professions = useSelector(getProfessions())
    const { signUp } = useAuth()
    const [newError, setNewError] = useState({})
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения',
            },
            isEmail: {
                message: 'Email введен некорректно',
            },
        },
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения',
            },
            min: {
                message: 'Имя должено состоять минимум из 3 символов',
                value: 3,
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

    const handleSubmit = async (data) => {
        setNewError({})
        const newData = {
            ...data,
            qualities: data.qualities.map((quality) => quality.value),
        }
        try {
            await signUp(newData)
            history.push('/')
        } catch (error) {
            setNewError(error)
        }
    }
    return (
        <>
            <h3 className="mb-4">Регистрация</h3>
            <FormComponent
                onSubmit={handleSubmit}
                validatorConfig={validatorConfig}
                newError={newError}
            >
                <TextField label="Электронная почта" name="email" />
                <TextField label="Имя" name="name" />
                <TextField label="Пароль" type="password" name="password" />
                <SelectField
                    label="Выбери свою профессию"
                    defaultOption="Choose..."
                    options={normalizeProfession(professions)}
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
                    options={normalizeQualities(qualitys)}
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
