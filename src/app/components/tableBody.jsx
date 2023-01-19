import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

function TableBody({ data, columns }) {
    const renderContent = (item, { path, component }) => {
        if (component) {
            if (typeof component === 'function') {
                return component(item)
            }
            return component
        }
        return get(item, path)
    }
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.entries(columns).map(([column, content]) => (
                        <td key={column}>{renderContent(item, content)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired,
}

export default TableBody
