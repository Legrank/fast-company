import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import NavBar from './app/components/ui/navBar'
import Users from './app/layouts/users'
import Login from './app/layouts/login'
import Main from './app/layouts/main'
import NotFound from './app/layouts/notFound'
import User from './app/layouts/user'
import EditUser from './app/layouts/editUser'

function App() {
    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/user/:id" component={User} />
                <Route exact path="/user/:id/edit" component={EditUser} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </div>
    )
}

export default App
