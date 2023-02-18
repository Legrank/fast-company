import { getQualities, normalizeQualities } from './qualities'
import { getProfessionById } from './professions'

export const normalizeUser = (data) => ({
    ...data,
    qualities: normalizeQualities(data.qualities),
    profession: data.profession._id,
})
export const getUser = (data, qualities, professions) => ({
    ...data,
    qualities: getQualities(data.qualities, qualities),
    profession: getProfessionById(data.profession, professions),
})
