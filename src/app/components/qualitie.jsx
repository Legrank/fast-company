import React from 'react'
import PropTypes from 'prop-types'

export default function Qualitie({ qualitie }) {
    const className = 'badge bg-' + qualitie.color + ' mx-1'
    return <span className={className}>{qualitie.name}</span>
}

Qualitie.propTypes = {
    qualitie: PropTypes.object.isRequired,
}
