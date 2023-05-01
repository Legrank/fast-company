import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLogIn } from '../../store/users'

function ProtectedRoute({ component: Component, cildren, ...rest }) {
    const isLoggedIn = useSelector(getIsLogIn())
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location },
                            }}
                        />
                    )
                }
                return Component ? <Component {...props} /> : cildren
            }}
        ></Route>
    )
}

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    cildren: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    location: PropTypes.object,
}

export default ProtectedRoute
