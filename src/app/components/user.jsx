import React from 'react'
import Qualitie from './qualitie'
import Bookmark from './bookmark'

const User = ({ user, onDelete, toogleBookmark }) => {
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
          toogleBookmark={toogleBookmark}
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

export default User
