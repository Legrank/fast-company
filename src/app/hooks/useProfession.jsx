import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import professionService from '../services/profession.service'

const ProfessionContext = React.createContext()

export const useProfession = () => {
    return useContext(ProfessionContext)
}

function ProfessionProvider({ children }) {
    const errorCatcher = (error) => {
        const { message } = error.response.data
        setError(message)
        setLoading(false)
    }
    const getProfessionsList = async () => {
        try {
            const { content } = await professionService.get()
            setProfessions(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }
    const getProfession = (professionId) => {
        return professions.find((profession) => profession._id === professionId)
    }

    const [isLoading, setLoading] = useState(true)
    const [professions, setProfessions] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getProfessionsList()
    }, [])
    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])
    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    )
}

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
}

export default ProfessionProvider
