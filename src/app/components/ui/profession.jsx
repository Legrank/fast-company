import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
    getProfession,
    getProfessionsLoadingStatus,
} from '../../store/professions'

function Profession({ id }) {
    const profession = useSelector(getProfession(id))
    const isLoading = useSelector(getProfessionsLoadingStatus())
    if (isLoading) {
        return 'Загрузка...'
    }
    return <p>{profession.name}</p>
}

Profession.propTypes = {
    id: PropTypes.string.isRequired,
}

export default Profession
