import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getDataStatus, loadUsersList } from '../../../store/users'

function UsersLoader({ children }) {
    const dispatch = useDispatch()
    const dataStatus = useSelector(getDataStatus())
    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList())
    }, [])
    if (!dataStatus) return 'Загрузка'
    return children
}

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
}

export default UsersLoader
