import React from 'react'
import PropTypes from 'prop-types'

function GroupList({ professions }) {
    return <div>GroupList</div>
}

GroupList.propTypes = {
    professions: PropTypes.oneOfType(PropTypes.array, PropTypes.object)
        .isRequired,
}

export default GroupList
