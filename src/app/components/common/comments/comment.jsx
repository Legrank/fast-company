import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import API from '../../../api'

function dateFormat(date) {
    const MINUTS30 = 30 * 60 * 1000
    const createDate = new Date(Number(date))
    const newDate = new Date()
    const elapsed = newDate.getTime() - createDate.getTime()
    if (elapsed <= MINUTS30) {
        const MINUTS1 = 60 * 1000
        const MINUTS5 = 5 * 60 * 1000
        const MINUTS10 = 10 * 60 * 1000
        if (elapsed <= MINUTS1) {
            return '1 минуту назад'
        }
        if (elapsed <= MINUTS5) {
            return '5 минут назад'
        }
        if (elapsed <= MINUTS10) {
            return '10 минут назад'
        }
        return '30 минут назад'
    }
    const createYear = createDate.getFullYear()
    const createMonth = createDate.getMonth()
    const createDay = createDate.getDay()
    const newYear = newDate.getFullYear()
    if (createYear < newYear) {
        return `${createDay} ${createMonth + 1} ${createYear}`
    }
    const newMonth = newDate.getMonth()
    const newDay = newDate.getDay()
    if (createMonth < newMonth || createDay < newDay) {
        return `${createDay} ${createDate.toLocaleDateString('default', {
            month: 'long',
        })}`
    }
    const createMinutes =
        createDate.getMinutes() < 10
            ? `0${createDate.getMinutes()}`
            : createDate.getMinutes()
    const creatHours =
        createDate.getHours() < 10
            ? `0${createDate.getHours()}`
            : createDate.getHours()
    return `Сегодня ${creatHours} : ${createMinutes}`
}

function Comment({ comment, removeComment }) {
    const handleRemove = () => {
        removeComment(comment._id)
    }
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        API.users.getById(comment.userId).then((user) => {
            setUser(user)
            setIsLoading(false)
        })
    }, [])
    if (isLoading) {
        return <div className="bg-light card-body mb-3">Загрузка...</div>
    }
    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        {user ? user.name : 'Загрузка...'}
                                        <span className="small mx-2">
                                            {dateFormat(
                                                Number(comment.created_at)
                                            )}
                                        </span>
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={handleRemove}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
}

export default Comment
