import React from 'react'
import PropTypes from 'prop-types'

import TableHead from './tableHead'
import TableBody from './tableBody'

function Table({ users, onSort, selectedSort, columns, children }) {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHead
                        selectedSort={selectedSort}
                        onSort={onSort}
                        columns={columns}
                    ></TableHead>
                    <TableBody columns={columns} data={users}></TableBody>
                </>
            )}
        </table>
    )
}

Table.propTypes = {
    users: PropTypes.array,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    children: PropTypes.array,
}

export default Table
