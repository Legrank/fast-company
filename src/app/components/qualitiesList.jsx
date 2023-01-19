import React from 'react'
import PropTypes from 'prop-types'

import Quality from './quality'

function QualitiesList({ qualities }) {
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality._id} quality={quality}></Quality>
            ))}
        </>
    )
}

QualitiesList.propTypes = { qualities: PropTypes.array.isRequired }

export default QualitiesList