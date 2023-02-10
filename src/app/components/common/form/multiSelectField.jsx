/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

function MultiSelectField({ label, onChange, options, name }) {
    const handleChange = (value) => {
        onChange({ name, value })
    }
    if (!options) return null
    const optionsArray =
        typeof option === 'object' && !Array.isArray(options)
            ? Object.values(options).map((option) => ({
                  value: option._id,
                  label: option.name,
              }))
            : options
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[]}
                options={optionsArray}
                name={name}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    )
}

MultiSelectField.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    name: PropTypes.string.isRequired,
}

export default MultiSelectField
