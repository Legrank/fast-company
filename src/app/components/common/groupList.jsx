import React from 'react'
import PropTypes from 'prop-types'

function GroupList({
    items,
    valueProperty = '_id',
    contentProperty = 'name',
    selectedProf,
    onItemSelect,
}) {
    const itemsArray = Array.isArray(items) ? items : Object.values(items)
    return (
        <ul className="list-group">
            {itemsArray.map((item) => (
                <li
                    key={item[valueProperty]}
                    className={
                        'list-group-item' +
                        (item === selectedProf ? ' active' : '')
                    }
                    onClick={() => onItemSelect(item)}
                >
                    {item[contentProperty]}
                </li>
            ))}
        </ul>
    )
}

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    onItemSelect: PropTypes.func.isRequired,
    selectedProf: PropTypes.object,
}

export default GroupList
