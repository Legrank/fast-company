import React from 'react'
import { useParams } from 'react-router-dom'

import Comments from '../../ui/comments'
import MeetingsCard from '../../ui/meetingsCard'
import QualitiesCard from '../../ui/qualitiesCard'
import UserCard from '../../ui/userCard'
import { useUser } from '../../../hooks/useUsers'
import CommentsProvider from '../../../hooks/useComments'

export default function UserPage() {
    const { id } = useParams()
    const { getUserById } = useUser()
    const user = getUserById(id)

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
                    <CommentsProvider>
                        <Comments />
                    </CommentsProvider>
                </div>
            </div>
        </div>
    )
}
