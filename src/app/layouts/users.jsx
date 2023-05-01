import React from 'react'
import { useParams } from 'react-router-dom'
import UsersPage from '../components/page/usersPage'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/editUser'
import UsersLoader from '../components/ui/hoc/usersLoader'

export default function Users() {
    const { id, edit } = useParams()
    let component
    if (edit) {
        component = <EditUserPage />
    } else if (id) {
        component = <UserPage />
    } else {
        component = <UsersPage />
    }
    return <UsersLoader>{component}</UsersLoader>
}
