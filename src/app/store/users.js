/* eslint-disable indent */
import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import history from '../utils/history'
import { genereteAuthError } from '../utils/generateAuthError'

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false,
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false,
      }

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
            state.dataLoaded = true
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFiled: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, actions) => {
            state.entities.push(actions.payload)
        },
        userLoggedOut: (state) => {
            state.auth = null
            state.isLoggedIn = false
        },
        userUpdate: (state, actions) => {
            const index = state.entities.findIndex(
                (user) => user._id === state.auth.userId
            )
            state.entities[index] = actions.payload
        },
        authRequested: (state) => {
            state.error = null
        },
    },
})

const { reducer: usersReducer, actions } = usersSlice
const {
    usersRequested,
    usersReceived,
    usersRequestFiled,
    authRequestedSuccess,
    authRequestFiled,
    userCreated,
    userLoggedOut,
    userUpdate,
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const createUserFiled = createAction('users/createUserFiled')

export const login =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload
        dispatch(authRequested())
        try {
            const data = await authService.login({ email, password })
            dispatch(authRequestedSuccess({ userId: data.localId }))
            localStorageService.setTokens(data)
            history.push(redirect)
        } catch (error) {
            const { code, message } = error.response.data.error
            if (code === 400) {
                const errorMessage = genereteAuthError(message)
                dispatch(authRequestFiled(errorMessage))
            } else {
                dispatch(authRequestFiled(error.message))
            }
        }
    }
export const sungUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested())
        try {
            const data = await authService.register({ email, password })
            localStorageService.setTokens(data)
            dispatch(authRequestedSuccess({ userId: data.localId }))
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    completedMeetings: randomInt(5, 500),
                    rate: randomInt(1, 5),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest,
                })
            )
        } catch (error) {
            dispatch(authRequestFiled(error.message))
        }
    }
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push('/')
}
const createUser = (payload) => async (dispatch) => {
    dispatch(userCreateRequested())
    try {
        const { content } = await userService.create(payload)
        dispatch(userCreated(content))
        history.push('/users')
    } catch (error) {
        dispatch(createUserFiled(error.message))
    }
}
export const updateUser = (payload) => async (dispatch) => {
    const { content } = await userService.update(payload)
    dispatch(userUpdate(content))
}

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const { content } = await userService.get()
        dispatch(usersReceived(content))
    } catch (error) {
        dispatch(usersRequestFiled(error.message))
    }
}

export const getUsersList = () => (state) => state.users.entities
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === userId)
    }
    return {}
}
export const getIsLogIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getCarrentUserId = () => (state) => state.users.auth.userId
export const getCarrentUserData = () => (state) => {
    return state.users.dataLoaded
        ? state.users.entities.find(
              (user) => user._id === state.users.auth.userId
          )
        : null
}
export const getAuthError = () => (state) => state.users.error

export default usersReducer
