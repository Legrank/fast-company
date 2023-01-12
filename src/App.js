import { useState } from 'react'
import api from './app/api'
import Users from './app/components/users'
import { SearchStatus } from './app/components/searchStatus'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => user._id !== userId)
    setUsers(newUsers)
  }
  const handleTogleBookmark = (userId) => {
    const newUsers = users.map((user) => {
      if (user._id === userId) user.bookmark = !user.bookmark
      return user
    })
    setUsers(newUsers)
  }

  return (
    <div className="App">
      <SearchStatus countUser={users.length}></SearchStatus>
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleTogleBookmark}
      ></Users>
    </div>
  )
}

export default App
