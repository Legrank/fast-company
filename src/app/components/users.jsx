import { useState } from 'react'
import PropTypes from 'prop-types'

import User from './user'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'

const Users = ({ users, ...rest }) => {
  const PAGE_SIZE = 4
  const itemCount = users.length
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const userCrop = paginate(users, currentPage, PAGE_SIZE)
  const usersRows = userCrop.map((user) => (
    <User user={user} key={user._id} {...rest}></User>
  ))

  return (
    <>
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
      <Pagination
        itemCount={itemCount}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></Pagination>
    </>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
}

export default Users
