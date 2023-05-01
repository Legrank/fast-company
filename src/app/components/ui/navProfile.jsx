import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCarrentUserData } from '../../store/users'

function NavProfile() {
    const currentUser = useSelector(getCarrentUserData())
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }
    if (!currentUser) return 'Загрузка'
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
