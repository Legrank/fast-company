import { orderBy } from 'lodash'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../api'
import { CommetsList, AddComment } from '../common/comments'

function Comments() {
    const handleAddComment = (userId, content) => {
        API.comments
            .add({ userId, content, pageId: id })
            .then((newComment) => setComments((prev) => [...prev, newComment]))
    }
    const handleRemoveComment = (id) => {
        API.comments.remove(id).then((id) => {
            setComments((prev) => prev.filter((x) => x._id !== id))
        })
    }
    const { id } = useParams()
    const [comments, setComments] = useState([])

    useEffect(() => {
        API.comments.fetchCommentsForUser(id).then((data) => {
            setComments(data)
        })
    }, [])
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
