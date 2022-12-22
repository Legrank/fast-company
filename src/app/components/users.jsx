import React, { useState } from 'react'
import api from '../api'
import User from './user'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => user._id !== userId)
    setUsers(newUsers)
  }
  if (users.length === 0)
    return (
      <span className="badge bg-danger fs-4">Сегодня тусы не будет :(</span>
    )
  const renderPhrase = (countUser) => {
    const lastNumber = countUser % 10
    const numbers = [2, 3, 4]
    const ignoreNumbers = [12, 13, 14]
    return ignoreNumbers.includes(countUser) || !numbers.includes(lastNumber)
      ? 'человек тусанёт'
      : 'человека тусанут'
  }

  const usersRows = users.map((user) => (
    <User user={user} key={user._id} handleDelete={handleDelete}></User>
  ))

  return (
    <>
      <span className="badge bg-primary fs-4">
        {users.length} {renderPhrase(users.length)} с тобой сегодня
      </span>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{usersRows}</tbody>
      </table>
    </>
  )
}

export default Users
