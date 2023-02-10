import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginForm from '../components/ui/loginForm'
import RegisterForm from '../components/ui/registerForm'

export default function Login() {
    const REGISTER = 'register'
    const LOGIN = 'login'
    const toggleFormType = () => {
        setFormType((prev) => (prev === REGISTER ? LOGIN : REGISTER))
    }

    const { type } = useParams()
    const [formType, setFormType] = useState(
        type === REGISTER ? REGISTER : LOGIN
    )

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === REGISTER ? (
                        <RegisterForm toLogin={toggleFormType} />
                    ) : (
                        <LoginForm toRegister={toggleFormType} />
                    )}
                </div>
            </div>
        </div>
    )
}
