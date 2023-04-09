import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function ProtectedRoute({ component: Component, cildren, ...rest }) {
    const { currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
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
