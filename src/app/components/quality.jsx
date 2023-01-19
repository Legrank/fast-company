import React from 'react'
import PropTypes from 'prop-types'

export default function Quality({ quality }) {
    const className = 'badge bg-' + quality.color + ' mx-1'
    return <span className={className}>{quality.name}</span>
}

Quality.propTypes = {
    quality: PropTypes.object.isRequired,
}
