import React from 'react'
import PropTypes from 'prop-types'

function Bookmark({ bookmark, userId, onToggleBookMark }) {
    /* eslint-disable multiline-ternary */
    const icon = bookmark ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bookmark-star-fill"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
            />
        </svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bookmark"
            viewBox="0 0 16 16"
        >
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
        </svg>
    )
    return (
        <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => onToggleBookMark(userId)}
        >
            {icon}
        </button>
    )
}

Bookmark.propTypes = {
    bookmark: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
}

export default Bookmark
