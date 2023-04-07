import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import NavBar from './app/components/ui/navBar'
import Users from './app/layouts/users'
import Login from './app/layouts/login'
import Main from './app/layouts/main'
import NotFound from './app/layouts/notFound'
import { ToastContainer } from 'react-toastify'
import ProfessionProvider from './app/hooks/useProfession'
import AuthProvider from './app/hooks/useAuth'
import QualityProvider from './app/hooks/useQuality'

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <QualityProvider>
                        <Switch>
                            <Route path="/" exact component={Main} />

                            <Route path="/login/:type?" component={Login} />
                            <Route
                                path="/users/:id?/:edit?"
                                component={Users}
                            />

                            <Route path="/404" component={NotFound} />
                            <Redirect to="/404" />
                        </Switch>
                    </QualityProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    )
}

export default App
