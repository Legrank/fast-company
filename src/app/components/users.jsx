import PropTypes from 'prop-types'

import User from './user'

const Users = ({ users, ...rest }) => {
  const usersRows = users.map((user) => (
    <User user={user} key={user._id} {...rest}></User>
  ))

  return (
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
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
}

export default Users
