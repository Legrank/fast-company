/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import chroma from 'chroma-js'

const animatedComponents = makeAnimated()

function MultiSelectField({ label, onChange, options, name, defaultValue }) {
    const getColor = (color) => {
        const colors = {
            primary: '#0d6efd',
            secondary: '#6c757d',
            success: '#198754',
            info: '#0dcaf0',
            warning: '#ffc107',
            danger: '#dc3545',
            light: '#f8f9fa',
            dark: '#212529',
        }
        return colors[color]
    }
    const handleChange = (value) => {
        onChange({ name, value })
    }
    if (!options) return null
    const optionsArray =
        typeof options === 'object' && !Array.isArray(options)
            ? Object.values(options).map((option) => ({
                  value: option._id,
                  label: option.name,
                  color: option.color,
              }))
            : options
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={defaultValue}
                options={optionsArray}
                name={name}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                styles={{
                    control: (styles) => ({
                        ...styles,
                        backgroundColor: 'white',
                    }),
                    option: (
                        styles,
                        { data, isDisabled, isFocused, isSelected }
                    ) => {
                        const color = chroma(getColor(data.color))
                        return {
                            ...styles,
                            backgroundColor: isDisabled
                                ? undefined
                                : isSelected
                                ? getColor(data.color)
                                : isFocused
                                ? color.alpha(0.1).css()
                                : undefined,
                            color: isDisabled
                                ? '#ccc'
                                : isSelected
                                ? chroma.contrast(color, 'white') > 2
                                    ? 'white'
                                    : 'black'
                                : getColor(data.color),
                            cursor: isDisabled ? 'not-allowed' : 'default',

                            ':active': {
                                ...styles[':active'],
                                backgroundColor: !isDisabled
                                    ? isSelected
                                        ? getColor(data.color)
                                        : color.alpha(0.3).css()
                                    : undefined,
                            },
                        }
                    },
                    multiValue: (styles, { data }) => {
                        const color = chroma(getColor(data.color))
                        return {
                            ...styles,
                            backgroundColor: color.alpha(0.1).css(),
                        }
                    },
                    multiValueLabel: (styles, { data }) => ({
                        ...styles,
                        color: getColor(data.color),
                    }),
                    multiValueRemove: (styles, { data }) => ({
                        ...styles,
                        color: getColor(data.color),
                        ':hover': {
                            backgroundColor: getColor(data.color),
                            color: 'white',
                        },
                    }),
                }}
            />
        </div>
    )
}

MultiSelectField.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.array,
}

export default MultiSelectField
