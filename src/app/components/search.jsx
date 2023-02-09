import React from 'react'
import PropTypes from 'prop-types'

function Search({ value, onChange }) {
    return (
        <input
            type="email"
            className="form-control mb-2"
            placeholder="Поиск"
            onChange={onChange}
            value={value}
        ></input>
    )
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Search
