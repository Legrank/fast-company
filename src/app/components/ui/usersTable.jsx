import React from 'react'
import PropTypes from 'prop-types'

import Table from '../common/table/table'
import TableHead from '../common/table/tableHead'
import TableBody from '../common/table/tableBody'
import Bookmark from '../common/bookmark'
import QualitiesList from './qualities/qualitiesList'
import { Link } from 'react-router-dom'
import Profession from './profession'

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
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            ),
        },
        qualities: {
            name: 'Качества',
            component: (user) => (
                <QualitiesList qualities={user.qualities}></QualitiesList>
            ),
        },
        profession: {
            name: 'Профессия',
            component: (user) => <Profession id={user.profession} />,
        },
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
