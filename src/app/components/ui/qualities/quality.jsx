import React from 'react'
import PropTypes from 'prop-types'
import { useQuality } from '../../../hooks/useQuality'

export default function Quality({ qualityId }) {
    const { isLoading, getQuality } = useQuality()
    const quality = getQuality(qualityId)
    if (isLoading) {
        return 'Загрузка...'
    }
    const className = 'badge bg-' + quality.color + ' mx-1'
    return <span className={className}>{quality.name}</span>
}

Quality.propTypes = {
    qualityId: PropTypes.string.isRequired,
}
