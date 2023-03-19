import React from 'react'
import PropTypes from 'prop-types'
import { useProfession } from '../../hooks/useProfession'

function Profession({ id }) {
    const { isLoading, getProfession } = useProfession()
    const profession = getProfession(id)
    if (isLoading) {
        return 'Загрузка...'
    }
    return <p>{profession.name}</p>
}

Profession.propTypes = {
    id: PropTypes.string.isRequired,
}

export default Profession
