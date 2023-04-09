import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

function NavProfile() {
    const { currentUser } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }
    return (
        <div className="dropdown">
            <div
                className="btn dropdown-toggle align-items-center d-flex"
                onClick={toggleMenu}
            >
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Профиль
                </Link>
                <Link to={'/logout'} className="dropdown-item">
                    Выход
                </Link>
            </div>
        </div>
    )
}

export default NavProfile
