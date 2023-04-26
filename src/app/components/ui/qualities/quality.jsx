import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
    getQualitie,
    getQualitiesLoadingStatus,
} from '../../../store/qualities'

export default function Quality({ qualityId }) {
    const quality = useSelector(getQualitie(qualityId))
    const isLoading = useSelector(getQualitiesLoadingStatus())
    if (isLoading) {
        return 'Загрузка...'
    }
    const className = 'badge bg-' + quality.color + ' mx-1'
    return <span className={className}>{quality.name}</span>
}

Quality.propTypes = {
    qualityId: PropTypes.string.isRequired,
}
