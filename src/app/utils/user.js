/* eslint-disable */
export class User {
    constructor(user) {
        this._id = user._id
        this.name = user.name
        this.completedMeetings = user.completedMeetings
        this.rate = user.rate
        this.bookmark = user.bookmark
        this.profession = user.profession._id
        this.sex = user.sex
        this.email = user.email
        const qualities = user.qualities.map((qualitie) => ({
            value: qualitie._id,
            color: qualitie.color,
            label: qualitie.name,
        }))
        this.qualities = qualities
    }
}

export class UserDTO {
    constructor(user, professions) {
        const professionsArray =
            typeof professions === 'object' && !Array.isArray(professions)
                ? Object.values(professions)
                : professions
        const profession = professionsArray.find((profession) => {
            return profession._id === user.profession
        })
        const qualities = user.qualities.map((qualitie) => ({
            _id: qualitie.value,
            color: qualitie.color,
            name: qualitie.label,
        }))
        this._id = user._id
        this.name = user.name
        this.completedMeetings = user.completedMeetings
        this.rate = user.rate
        this.bookmark = user.bookmark
        this.sex = user.sex
        this.email = user.email
        this.profession = profession
        this.qualities = qualities
    }
}
