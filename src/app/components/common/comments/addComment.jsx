import React from 'react'
import PropTypes from 'prop-types'
import FormComponent, { TextareaField } from '../form'

function AddComment({ addComment }) {
    const handleSubmit = ({ content }) => {
        addComment(content)
    }
    const validatorConfig = {
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
