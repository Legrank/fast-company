import React from 'react'
import PropTypes from 'prop-types'

import QualitiesList from '../../ui/qualities'

function UserInfo({ user }) {
    return (
        <>
            <h1>{user.name}</h1>
            <h3>Профессия: {user.profession.name}</h3>
            <div>
                <QualitiesList qualities={user.qualities}></QualitiesList>
            </div>
            <div>Встретился раз: {user.completedMeetings}</div>
            <h3>Оценка: {user.rate}</h3>
        </>
    )
}

UserInfo.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserInfo
