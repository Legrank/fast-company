import React from 'react'
import PropTypes from 'prop-types'
import { Comment } from './'

function CommetsList({ comments, onRemoveComment }) {
    return comments.map((comment) => (
        <Comment
            comment={comment}
            key={comment._id}
            removeComment={onRemoveComment}
        />
    ))
}

CommetsList.propTypes = {
    comments: PropTypes.array,
    onRemoveComment: PropTypes.func.isRequired,
}

export default CommetsList
