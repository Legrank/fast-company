import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Quality from './quality'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from '../../../store/qualities'

function QualitiesList({ qualities }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality} qualityId={quality}></Quality>
            ))}
        </>
    )
}

QualitiesList.propTypes = { qualities: PropTypes.array.isRequired }

export default QualitiesList
