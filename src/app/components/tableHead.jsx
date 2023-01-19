import React from 'react'
import PropTypes from 'prop-types'

function TableHead({ onSort, selectedSort, columns }) {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                reverse: !selectedSort.reverse,
            })
        } else {
            onSort({ path: item, reverse: false })
        }
    }
    return (
        <thead>
            <tr>
                {Object.entries(columns).map(([column, { name, path }]) => (
                    <th
                        key={column}
                        onClick={path ? () => handleSort(path) : undefined}
                        scope="col"
                        {...{ role: path && 'button' }}
                    >
                        {name}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

TableHead.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
}

export default TableHead
