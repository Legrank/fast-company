import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../../api'
import Comments from '../../ui/comments'
import MeetingsCard from '../../ui/meetingsCard'
import QualitiesCard from '../../ui/qualitiesCard'
import UserCard from '../../ui/userCard'

export default function UserPage() {
    const { id } = useParams()
    const [user, setUser] = useState()

    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUser(data)
        })
    }, [])

    // const handleGoAllUsers = () => {
    //     history.push('/users')
    // }

    if (!user) return <div>Загрузка...</div>
    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard user={user} />
                    <MeetingsCard user={user} />
                </div>
                <div className="col-md-8">
                    <Comments />
                </div>
            </div>
        </div>
    )
}
