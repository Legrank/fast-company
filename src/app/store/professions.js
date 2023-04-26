import { createSlice } from '@reduxjs/toolkit'
import { isOutDated } from '../utils/date'
import professionService from '../services/profession.service'

const professinsSlice = createSlice({
    name: 'professions',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
            state.lastFetch = Date.now()
        },
        professionsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
    },
})

const { reducer: professionsReducer, actions } = professinsSlice
const { professionsRequested, professionsReceived, professionsRequestFiled } =
    actions
export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions
    if (isOutDated(lastFetch)) {
        dispatch(professionsRequested())
        try {
            const { content } = await professionService.get()
            dispatch(professionsReceived(content))
        } catch (error) {
            dispatch(professionsRequestFiled(error.message))
        }
    }
}

export const getProfessions = () => (store) => store.professions.entities
export const getProfession = (profId) => (store) =>
    store.professions.entities.find((item) => item._id === profId)
export const getProfessionsLoadingStatus = () => (store) =>
    store.professions.isLoading

export default professionsReducer
