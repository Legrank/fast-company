import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'
import { isOutDated } from '../utils/date'

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
            state.lastFetch = Date.now()
        },
        qualitiesRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
    },
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFiled } = actions
export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities
    if (isOutDated(lastFetch)) {
        dispatch(qualitiesRequested())
        try {
            const { content } = await qualityService.get()
            dispatch(qualitiesReceived(content))
        } catch (error) {
            dispatch(qualitiesRequestFiled(error.message))
        }
    }
}
export const getQualities = () => (store) => store.qualities.entities
export const getQualitie = (qualId) => (store) =>
    store.qualities.entities.find((item) => item._id === qualId)
export const getQualitiesLoadingStatus = () => (store) =>
    store.qualities.isLoading

export default qualitiesReducer
