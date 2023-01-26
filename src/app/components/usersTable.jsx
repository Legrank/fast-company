import React from 'react'
import PropTypes from 'prop-types'

import Table from './table'
import TableHead from './tableHead'
import TableBody from './tableBody'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'
import { Link } from 'react-router-dom'

function UsersTable({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
}) {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => (
                <Link to={`/user/${user._id}`}>{user.name}</Link>
            ),
        },
        qualities: {
            name: 'Качества',
            component: (user) => (
                <QualitiesList qualities={user.qualities}></QualitiesList>
            ),
        },
        profession: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился раз',
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избраное',
            component: (user) => (
                <Bookmark
                    bookmark={user.bookmark}
                    userId={user._id}
                    onToggleBookMark={onToggleBookMark}
                ></Bookmark>
            ),
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Удалить
                </button>
            ),
        },
    }
    return (
        <Table>
            <TableHead
                selectedSort={selectedSort}
                onSort={onSort}
                columns={columns}
            ></TableHead>
            <TableBody columns={columns} data={users}></TableBody>
        </Table>
    )
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
}

export default UsersTable
