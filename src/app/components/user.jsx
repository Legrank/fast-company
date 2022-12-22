import React from 'react'

const User = ({ user, handleDelete }) => {
  const badge = (qualitie) => {
    const className = 'badge bg-' + qualitie.color + ' mx-1'
    return (
      <span className={className} key={qualitie._id}>
        {qualitie.name}
      </span>
    )
  }
  const qualities = user.qualities.map((qualitie) => badge(qualitie))
  return (
    <tr>
      <td>{user.name}</td>
      <td>{qualities}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(user._id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  )
}

export default User
