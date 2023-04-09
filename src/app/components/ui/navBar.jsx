import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NavProfile from './navProfile'

const NavBar = () => {
    const { currentUser } = useAuth()
    const location = useLocation()
    const isActive = (path) => location.pathname === path
    const renderLink = ({ path, name }) => (
        <li className="nav-item" key={path}>
            <Link
                className={`nav-link ${isActive(path) ? 'active' : ''}`}
                to={path}
            >
                {name}
            </Link>
        </li>
    )
    const links = [
        { path: '/', name: 'Main' },
        { path: '/users', name: 'Users', auth: true },
    ]
    const filterLinks = useMemo(() => {
        return links.filter((link) => {
            const { auth } = link
            if (auth) {
                return !!currentUser
            }
            return true
        })
    }, [currentUser])
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <ul className="nav nav-pills mb-3">
                    {filterLinks.map((link) => renderLink(link))}
                </ul>
            </div>
            <div className="d-flex">
                {currentUser ? (
                    <NavProfile />
                ) : (
                    <Link
                        className={`nav-link ${
                            isActive('/login') ? 'active' : ''
                        }`}
                        to="/login"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default NavBar
