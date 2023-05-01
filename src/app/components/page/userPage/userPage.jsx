import React from 'react'
import { useParams } from 'react-router-dom'

import Comments from '../../ui/comments'
import MeetingsCard from '../../ui/meetingsCard'
import QualitiesCard from '../../ui/qualitiesCard'
import UserCard from '../../ui/userCard'
import CommentsProvider from '../../../hooks/useComments'
import { useSelector } from 'react-redux'
import { getUserById } from '../../../store/users'

export default function UserPage() {
    const { id } = useParams()
    const user = useSelector(getUserById(id))

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
