import { createAction, createSlice } from '@reduxjs/toolkit'
// import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreateReceived: (state, action) => {
            state.entities.push(action.payload)
        },
        commentCreateRequestFiled: (state, action) => {
            state.error = action.payload
        },
        commentRemoveReceived: (state, action) => {
            const index = state.entities.findIndex(
                (comment) => comment._id === action.payload
            )
            state.entities.splice(index, 1)
        },
        commentRemoveRequestFiled: (state, action) => {
            state.error = action.payload
        },
    },
})

const commentCreateRequested = createAction('comments/createRequested')
const commentRemoveRequested = createAction('comments/removeRequested')

const { reducer: commentsReducer, actions } = commentsSlice
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFiled,
    commentCreateReceived,
    commentCreateRequestFiled,
    commentRemoveReceived,
    commentRemoveRequestFiled,
} = actions
export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(pageId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFiled(error.message))
    }
}
export const createComment = (comment) => async (dispatch) => {
    dispatch(commentCreateRequested())
    try {
        const { content } = await commentService.createComment(comment)
        dispatch(commentCreateReceived(content))
    } catch (error) {
        dispatch(commentCreateRequestFiled(error.message))
    }
}
export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentRemoveRequested())
    try {
        const { content } = await commentService.removeComent(commentId)
        if (content === null) {
            dispatch(commentRemoveReceived(commentId))
        }
    } catch (error) {
        dispatch(commentRemoveRequestFiled(error.message))
    }
}

export const getComments = () => (store) => store.comments.entities
export const getCommentById = (commentId) => (store) =>
    store.comments.entities.find((item) => item._id === commentId)
export const getCommentsLoadingStatus = () => (store) =>
    store.comments.isLoading

export default commentsReducer
