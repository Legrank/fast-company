import React from 'react'
import PropTypes from 'prop-types'

import Arrow from '../arrow'

function TableHead({ onSort, selectedSort, columns }) {
    const isActive = (item) => selectedSort.path === item
    const handleSort = (item) => {
        if (isActive(item)) {
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
                        {isActive(path) && (
                            <Arrow position={selectedSort.reverse}></Arrow>
                        )}
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
