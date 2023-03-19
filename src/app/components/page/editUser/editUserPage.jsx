import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../../api'
import FormComponent, {
    TextField,
    SelectField,
    MultiSelectField,
    RadioField,
} from '../../common/form'
import { normalizeProfession } from '../../../utils/professions'
import { normalizeQualities } from '../../../utils/qualities'
import { normalizeUser, getUser } from '../../../utils/user'

export default function EditUserPage() {
    const handleUpdateUser = (data) => {
        api.users.update(id, getUser(data, qualities, professions))
        history.push(`/users/${id}`)
    }
    const handleBack = () => {
        history.push(`/users/${id}`)
    }
    const [user, setUser] = useState()
    const [professions, setProfessions] = useState()
    const [qualities, setQualities] = useState({})
    const { id } = useParams()
    const history = useHistory()
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(normalizeUser(data)))
        api.professions
            .fetchAll()
            .then((data) => setProfessions(normalizeProfession(data)))
        api.qualities
            .fetchAll()
            .then((data) => setQualities(normalizeQualities(data)))
    }, [])
    if (!user) return 'Загрузка'
    return (
        <div className="w-75 mx-auto d-flex">
            <button
                type="button"
                className="btn btn-primary align-self-start me-2"
                onClick={handleBack}
            >
                Назад
            </button>
            <FormComponent
                onSubmit={handleUpdateUser}
                defaultData={user}
                validatorConfig={{}}
                className="flex-grow-1"
            >
                <TextField label="Имя" name="name" autoFocus />
                <TextField label="email" name="email" />
                <SelectField
                    options={professions}
                    label={'Выбирите свою профессию'}
                    name={'profession'}
                />
                <MultiSelectField
                    options={qualities}
                    label="Ваши качества"
                    name="qualities"
                    defaultValue={user.qualities}
                />
                <RadioField
                    options={[
                        { name: 'Male', value: 'male' },
                        { name: 'Female', value: 'female' },
                        { name: 'Other', value: 'other' },
                    ]}
                    label={'Укажите ваш пол'}
                    name={'sex'}
                />
                <button type="submit" className="btn btn-primary">
                    Сохранить
                </button>
            </FormComponent>
        </div>
    )
}
