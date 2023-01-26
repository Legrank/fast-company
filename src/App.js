import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import NavBar from './app/components/navBar'
import Users from './app/layouts/users'
import Login from './app/layouts/login'
import Main from './app/layouts/main'
import NotFound from './app/layouts/notFound'
import User from './app/layouts/user'

function App() {
    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route exact path="/users" component={Users} />
                <Route path="/user/:id" component={User} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </div>
    )
}

export default App
