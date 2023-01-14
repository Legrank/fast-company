import React from 'react'
import PropTypes from 'prop-types'

export const SearchStatus = ({ countUser }) => {
    const renderPhrase = (countUser) => {
        const lastNumber = countUser % 10
        const lastTwoNumber = countUser % 100
        const numbers = [2, 3, 4]
        const ignoreNumbers = [12, 13, 14]
        if (
            ignoreNumbers.includes(lastTwoNumber) ||
            !numbers.includes(lastNumber)
        ) {
            return 'человек тусанёт'
        } else {
            return 'человека тусанут'
        }
    }
    if (countUser === 0) {
        return (
            <span className="badge bg-danger fs-4">
                Сегодня тусы не будет :(
            </span>
        )
    }

    return (
        <span className="badge bg-primary fs-4">
            {countUser} {renderPhrase(countUser)} с тобой сегодня
        </span>
    )
}

SearchStatus.propTypes = {
    countUser: PropTypes.number.isRequired,
}
