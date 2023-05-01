import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import NavBar from './app/components/ui/navBar'
import Users from './app/layouts/users'
import Login from './app/layouts/login'
import Main from './app/layouts/main'
import NotFound from './app/layouts/notFound'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './app/hooks/useAuth'
import ProtectedRoute from './app/components/common/protectedRoute'
import LogOut from './app/layouts/logOut'
import AppLoader from './app/components/ui/hoc/appLoader'

function App() {
    return (
        <div className="App">
            <AppLoader>
                <AuthProvider>
                    <NavBar />

                    <Switch>
                        <Route path="/" exact component={Main} />

                        <Route path="/login/:type?" component={Login} />
                        <ProtectedRoute
                            path="/users/:id?/:edit?"
                            component={Users}
                        />
                        <Route path="/404" component={NotFound} />
                        <Route path="/logout" component={LogOut} />
                        <Redirect to="/404" />
                    </Switch>
                </AuthProvider>
            </AppLoader>
            <ToastContainer />
        </div>
    )
}

export default App
