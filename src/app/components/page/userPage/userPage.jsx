import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import api from '../../../api'
import QualitiesList from '../../ui/qualities'

export default function UserPage() {
    const history = useHistory()
    const { id } = useParams()
    const [user, setUser] = useState()
    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUser(data)
        })
    }, [])

    const handleGoAllUsers = () => {
        history.push('/users')
    }
    const handleEditUser = () => {
        history.push(`/user/${id}/edit`)
    }

    if (!user) return <div>Загрузка...</div>
    return (
        <div className="card w-75 mx-auto">
            <h1>{user.name}</h1>
            <h3>Профессия: {user.profession.name}</h3>
            <div>
                <QualitiesList qualities={user.qualities}></QualitiesList>
            </div>
            <div>Встретился раз: {user.completedMeetings}</div>
            <h3>Оценка: {user.rate}</h3>
            <div>
                <button
                    type="button"
                    className="btn btn-primary me-3"
                    onClick={handleEditUser}
                >
                    Редактировать
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleGoAllUsers}
                >
                    Все пользователи
                </button>
            </div>
        </div>
    )
}
