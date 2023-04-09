export const getProfessionById = (id, professions) => {
    for (const prof of professions) {
        if (prof.value === id) {
            return { _id: prof.value, name: prof.label }
        }
    }
}

export const normalizeProfession = (data) =>
    data.map((profession) => ({
        label: profession.name,
        value: profession._id,
    }))
