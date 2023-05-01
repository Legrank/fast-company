import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'
import { useSelector } from 'react-redux'
import { getCarrentUserId } from '../store/users'

const CommentsContext = React.createContext()

export const useComments = () => {
    return useContext(CommentsContext)
}
function CommentsProvider({ children }) {
    const errorCatcher = (error) => {
        const { message } = error.response.data
        setError(message)
        setLoading(false)
    }
    async function createComment(data) {
        const comment = {
            data,
            pageId: id,
            created_at: Date.now(),
            userId: currentUserId,
            _id: nanoid(),
        }
        try {
            const { content } = await commentService.createComment(comment)
            setComments((prev) => [...prev, content])
        } catch (error) {
            errorCatcher(error)
        }
    }
    async function getComments() {
        try {
            const { content } = await commentService.getComments(id)

            setComments(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }
    async function removeComment(commentId) {
        try {
            const { content } = await commentService.removeComent(commentId)
            if (content === null) {
                setComments((prev) =>
                    prev.filter((comment) => comment._id !== commentId)
                )
            }
        } catch (error) {
            errorCatcher(error)
        }
    }

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [comments, setComments] = useState([])
    const { id } = useParams()
    const currentUserId = useSelector(getCarrentUserId())

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])
    useEffect(() => {
        getComments()
    }, [id])

    return (
        <CommentsContext.Provider
            value={{ isLoading, comments, createComment, removeComment }}
        >
            {children}
        </CommentsContext.Provider>
    )
}

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
}

export default CommentsProvider
