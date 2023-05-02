import { orderBy } from 'lodash'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { CommetsList, AddComment } from '../common/comments'
import { useDispatch, useSelector } from 'react-redux'
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment,
} from '../../store/comments'
import { getCarrentUserId } from '../../store/users'

function Comments() {
    const { id } = useParams()
    const dispath = useDispatch()
    const currentUserId = useSelector(getCarrentUserId())
    useEffect(() => {
        dispath(loadCommentsList(id))
    }, [id])
    const isLoading = useSelector(getCommentsLoadingStatus())
    const handleAddComment = (content) => {
        const comment = {
            data: content,
            pageId: id,
            created_at: Date.now(),
            userId: currentUserId,
            _id: nanoid(),
        }
        dispath(createComment(comment))
    }
    const handleRemoveComment = (id) => {
        dispath(removeComment(id))
    }
    const comments = useSelector(getComments())
    const sortedComments = orderBy(comments, ['created_at'], ['desc'])
    return (
        <>
            <AddComment pageId={id} addComment={handleAddComment} />
            {comments && comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommetsList
                                onRemoveComment={handleRemoveComment}
                                comments={sortedComments}
                            />
                        ) : (
                            'Загрузка'
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Comments
