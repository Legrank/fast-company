import React, { useState, useEffect } from 'react'

import api from '../api'
import { paginate } from '../utils/paginate'

import { SearchStatus } from './searchStatus'
import User from './user'
import Pagination from './pagination'
import GroupList from './groupList'

const Users = () => {
    const PAGE_SIZE = 4

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
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const [users, setUsers] = useState([])
    const [professions, setProfessions] = useState()
    // const [selectedProf, setSelectedProf] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    const itemCount = users.length

    const userCrop = paginate(users, currentPage, PAGE_SIZE)
    const usersRows = userCrop.map((user) => (
        <User
            user={user}
            key={user._id}
            onDelete={handleDelete}
            onToggleBookMark={handleTogleBookmark}
        ></User>
    ))

    return (
        <>
            <GroupList professions={professions}></GroupList>
            <SearchStatus countUser={users.length}></SearchStatus>
            {itemCount > 0 && (
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
            )}
            <Pagination
                itemCount={itemCount}
                pageSize={PAGE_SIZE}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            ></Pagination>
        </>
    )
}

export default Users
