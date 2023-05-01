import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
    getIsLogIn,
    getUsersLoadingStatus,
    loadUsersList,
} from '../../../store/users'
import { loadQualitiesList } from '../../../store/qualities'
import { loadProfessionsList } from '../../../store/professions'

function AppLoader({ children }) {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLogIn())
    const usersStatusLoading = useSelector(getUsersLoadingStatus())
    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionsList())
        if (isLoggedIn) {
            dispatch(loadUsersList())
        }
    }, [isLoggedIn])
    if (usersStatusLoading) return 'Загрузка'
    return children
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
}

export default AppLoader
