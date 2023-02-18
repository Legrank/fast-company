import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../../api'
import TextField from '../../common/form/textField'
import MultiSelectField from '../../common/form/multiSelectField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import { normalizeProfession } from '../../../utils/professions'
import { normalizeQualities } from '../../../utils/qualities'
import { normalizeUser, getUser } from '../../../utils/user'

export default function EditUserPage() {
    const handleChange = (data) => {
        setUser((prevState) => ({
            ...prevState,
            [data.name]: data.value,
        }))
    }
    const handleUpdateUser = () => {
        api.users.update(id, getUser(user, qualities, professions))
        history.push(`/user/${id}`)
    }
    const [user, setUser] = useState()
    const [professions, setProfessions] = useState()
    const [qualities, setQualities] = useState({})
    const errors = {}
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
        <div className="w-75 mx-auto">
            <TextField
                label="Имя"
                name="name"
                value={user.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
            />
            <SelectField
                options={professions}
                onChange={handleChange}
                label={'Выбирите свою профессию'}
                name={'profession'}
                value={user.profession}
                error={errors.profession}
            />
            <MultiSelectField
                options={qualities}
                label="Ваши качества"
                onChange={handleChange}
                name="qualities"
                defaultValue={user.qualities}
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
                value={user.sex}
            />
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateUser}
            >
                Сохранить
            </button>
        </div>
    )
}
