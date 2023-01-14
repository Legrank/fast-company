import React from 'react'
import Qualitie from './qualitie'
import Bookmark from './bookmark'
import PropTypes from 'prop-types'

const User = ({ user, onDelete, onToggleBookMark }) => {
    const qualities = user.qualities.map((qualitie) => (
        <Qualitie key={qualitie._id} qualitie={qualitie}></Qualitie>
    ))
    return (
        <tr>
            <td>{user.name}</td>
            <td>{qualities}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <Bookmark
                    bookmark={user.bookmark}
                    userId={user._id}
                    onToggleBookMark={onToggleBookMark}
                ></Bookmark>
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Удалить
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
}

export default User
