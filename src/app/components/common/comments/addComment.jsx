import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FormComponent, { SelectField, TextareaField } from '../form'
import API from '../../../api'

function userForSelect(users) {
    return Object.values(users).map((user) => ({
        label: user.name,
        value: user._id,
    }))
}

function AddComment({ addComment }) {
    const handleSubmit = ({ userId, content }) => {
        addComment(userId, content)
    }
    const [users, setUsers] = useState({})
    useEffect(() => {
        API.users.fetchAll().then((data) => {
            setUsers(userForSelect(data))
        })
    }, [])
    const validatorConfig = {
        userId: {
            isRequired: {
                message: 'Выбирите пользователя',
            },
        },
        content: {
            isRequired: {
                message: 'Пустой коментарий',
            },
        },
    }

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <FormComponent
                        validatorConfig={validatorConfig}
                        onSubmit={handleSubmit}
                        resetForm={true}
                    >
                        <h2>New comment</h2>
                        <SelectField
                            name="userId"
                            label=""
                            options={users}
                            defaultOption="Выберите пользователя"
                        />
                        <TextareaField
                            label="Сообщение"
                            name="content"
                            rows="3"
                        />
                        <button
                            className="btn btn-primary align-self-end"
                            type="submit"
                        >
                            Опубликовать
                        </button>
                    </FormComponent>
                </div>
            </div>
        </div>
    )
}
AddComment.propTypes = { addComment: PropTypes.func.isRequired }

export default AddComment
