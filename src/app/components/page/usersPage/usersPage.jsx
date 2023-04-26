import React, { useState, useEffect } from 'react'
import { orderBy } from 'lodash'

import { paginate } from '../../../utils/paginate'
import { SearchStatus } from '../../ui/searchStatus'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import UsersTable from '../../ui/usersTable'
import Search from '../../common/form/search'
import { useUser } from '../../../hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import {
    getProfessions,
    getProfessionsLoadingStatus,
    loadProfessionsList,
} from '../../../store/professions'

const UsersPage = () => {
    const PAGE_SIZE = 4
    const dispatch = useDispatch()

    const handleDelete = (userId) => {
        // const newUsers = users.filter((user) => user._id !== userId)
        // setUsers(newUsers)
        console.log(userId)
    }
    const handleTogleBookmark = (userId) => {
        const newUsers = users.map((user) => {
            if (user._id === userId) user.bookmark = !user.bookmark
            return user
        })
        // setUsers(newUsers)
        console.log(newUsers)
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const handleProfessionSelect = (profession) => {
        setSelectedProf(profession)
    }
    const handleSort = (item) => {
        setSortBy(item)
    }
    const clearFilter = () => {
        setSelectedProf()
    }
    const handleSearchInput = (e) => {
        setSearchText(e.target.value)
    }

    const { users, isLoading } = useUser()
    const { currentUser } = useAuth()
    const professions = useSelector(getProfessions())
    const isProfessionLoading = useSelector(getProfessionsLoadingStatus())
    const [selectedProf, setSelectedProf] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState({ path: 'name', reverse: false })
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if (selectedProf) setSearchText('')
        setCurrentPage(1)
    }, [selectedProf])
    useEffect(() => {
        if (searchText) setSelectedProf()
        setCurrentPage(1)
    }, [searchText])
    useEffect(() => {
        dispatch(loadProfessionsList())
    }, [])
    /* eslint-disable */
    const filterUsers = (users) => {
        const filteredUsers = users.filter(
            (user) => user._id !== currentUser._id
        )
        if (selectedProf) {
            return filteredUsers.filter(
                (profession) => profession.profession === selectedProf._id
            )
        }
        if (searchText) {
            return filteredUsers.filter((user) => {
                const regex = new RegExp(searchText.toLowerCase(), 'g')
                return regex.test(user.name.toLowerCase())
            })
        }
        return filteredUsers
    }

    const sortedUser = orderBy(
        filterUsers(users),
        [sortBy.path],
        [sortBy.reverse ? 'desc' : 'asc']
    )

    const userCrop = paginate(sortedUser, currentPage, PAGE_SIZE)
    const itemCount = filterUsers(users).length

    if (isLoading) return 'Loading...'
    return (
        <div className="d-flex">
            {!isProfessionLoading && (
                <div className="p-2 d-flex flex-column">
                    <GroupList
                        items={professions}
                        selectedProf={selectedProf}
                        onItemSelect={handleProfessionSelect}
                    ></GroupList>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="flex-grow-1">
                <SearchStatus countUser={itemCount}></SearchStatus>
                <Search
                    value={searchText}
                    onChange={handleSearchInput}
                ></Search>
                {itemCount > 0 && (
                    <UsersTable
                        users={userCrop}
                        onDelete={handleDelete}
                        onToggleBookMark={handleTogleBookmark}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    ></UsersTable>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemCount={itemCount}
                        pageSize={PAGE_SIZE}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    ></Pagination>
                </div>
            </div>
        </div>
    )
}

export default UsersPage
