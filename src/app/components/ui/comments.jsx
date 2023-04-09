import { orderBy } from 'lodash'
import React from 'react'
import { useParams } from 'react-router-dom'
import { CommetsList, AddComment } from '../common/comments'
import { useComments } from '../../hooks/useComments'

function Comments() {
    const handleAddComment = (content) => {
        createComment(content)
    }
    const handleRemoveComment = (id) => {
        removeComment(id)
    }
    const { id } = useParams()
    const { createComment, comments, removeComment } = useComments()
    const sortedComments = orderBy(comments, ['created_at'], ['desc'])
    return (
        <>
            <AddComment pageId={id} addComment={handleAddComment} />
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommetsList
                            onRemoveComment={handleRemoveComment}
                            comments={sortedComments}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Comments
