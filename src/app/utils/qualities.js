export const getQualities = (elements, qualities) => {
    const qualitiesArray = []
    for (const elem of elements) {
        for (const quality in qualities) {
            if (elem.value === qualities[quality].value) {
                qualitiesArray.push({
                    _id: qualities[quality].value,
                    name: qualities[quality].label,
                    color: qualities[quality].color,
                })
            }
        }
    }
    return qualitiesArray
}
export const normalizeQualities = (data) =>
    Object.values(data).map((option) => ({
        value: option._id,
        label: option.name,
        color: option.color,
    }))
