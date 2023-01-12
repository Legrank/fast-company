import { useState } from 'react'
import api from '../api'
import User from './user'
import { SearchStatus } from './searchStatus'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => user._id !== userId)
    setUsers(newUsers)
  }
  const toogleBookmark = (userId) => {
    const newUsers = users.map((user) => {
      if (user._id === userId) user.bookmark = !user.bookmark
      return user
    })
    setUsers(newUsers)
  }

  const usersRows = users.map((user) => (
    <User
      user={user}
      key={user._id}
      onDelete={handleDelete}
      toogleBookmark={toogleBookmark}
    ></User>
  ))

  return (
    <>
      <SearchStatus countUser={users.length}></SearchStatus>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избраное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{usersRows}</tbody>
      </table>
    </>
  )
}

export default Users
