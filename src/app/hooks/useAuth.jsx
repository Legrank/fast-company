import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import axios from 'axios'
import userService from '../services/user.service'
import localStorageService, {
    setTokens,
} from '../services/localStorage.service'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: { key: process.env.REACT_APP_FIREBASE_KEY },
})
const AuthContext = React.createContext()

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser()
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setIsLoading(false)
        }
    }
    async function signUp({ email, password, ...rest }) {
        const url = `accounts:signUp`
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true,
            })
            setTokens(data)
            await createUser({
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
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с таким Email уже существует',
                    }
                    throw errorObject
                }
            }
        }
    }
    async function signIn({ email, password }) {
        const url = `accounts:signInWithPassword`
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true,
            })
            setTokens(data)
            await getUserData()
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (
                    message === 'INVALID_PASSWORD' ||
                    message === 'EMAIL_NOT_FOUND'
                ) {
                    const errorObject = {
                        password: 'Неправильный логин или пароль',
                    }
                    throw errorObject
                }
                if (message === 'USER_DISABLED') {
                    const errorObject = {
                        password:
                            'Профиль заблокирован. Обратитесь в поддержку.',
                    }
                    throw errorObject
                }
            }
        }
    }
    async function logOut() {
        localStorageService.removeAuthData()
        setUser(null)
        history.push('/')
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }
    async function updateUser(data) {
        try {
            const { content } = await userService.update(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }
    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData()
        } else {
            setIsLoading(false)
        }
    }, [])
    return (
        <AuthContext.Provider
            value={{ signUp, signIn, logOut, currentUser, updateUser }}
        >
            {!isLoading ? children : 'Загрузка'}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
}

export default AuthProvider
