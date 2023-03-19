import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import qualityService from '../services/quality.service'
import { toast } from 'react-toastify'

const QualityContext = React.createContext()

export const useQuality = () => {
    return useContext(QualityContext)
}
function QualityProvider({ children }) {
    const getQualitysList = async () => {
        try {
            const { content } = await qualityService.get()
            setQualitys(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }
    const getQuality = (qualitieId) => {
        return qualitys.find((qualitie) => qualitie._id === qualitieId)
    }
    const errorCatcher = (error) => {
        const { message } = error.response.data
        setError(message)
        setLoading(false)
    }
    const [qualitys, setQualitys] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getQualitysList()
    }, [])
    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])
    return (
        <QualityContext.Provider value={{ qualitys, isLoading, getQuality }}>
            {!isLoading ? children : 'Загрузка'}
        </QualityContext.Provider>
    )
}

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
}

export default QualityProvider
