import React from 'react'
import { useHistory } from 'react-router-dom'
import FormComponent, {
    TextField,
    SelectField,
    MultiSelectField,
    RadioField,
} from '../../common/form'
import { useQuality } from '../../../hooks/useQuality'
import { useProfession } from '../../../hooks/useProfession'
import { useAuth } from '../../../hooks/useAuth'
import { normalizeQualities } from '../../../utils/qualities'
import { normalizeProfession } from '../../../utils/professions'

export default function EditUserPage() {
    const handleUpdateUser = (data) => {
        history.push(`/users/${currentUser._id}`)
        const user = {
            ...data,
            qualities: data.qualities.map((qualitie) => {
                return qualitie.value
            }),
        }
        updateUser(user)
    }
    const handleBack = () => {
        history.push(`/users/${currentUser._id}`)
    }
    const { qualitys, isLoading: qualitysLoading, getQuality } = useQuality()
    const { professions, isLoading: pofessionLoading } = useProfession()
    const { currentUser, updateUser } = useAuth()
    const history = useHistory()
    const user = {
        ...currentUser,
        qualities: currentUser.qualities.map((qualitieId) => {
            const qualitie = getQuality(qualitieId)
            return {
                value: qualitie._id,
                label: qualitie.name,
                color: qualitie.color,
            }
        }),
    }

    if (!currentUser && !qualitysLoading && !pofessionLoading) return 'Загрузка'
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
                    options={normalizeProfession(professions)}
                    label={'Выбирите свою профессию'}
                    name={'profession'}
                />
                <MultiSelectField
                    options={normalizeQualities(qualitys)}
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
