export const setAddress = (address) => {
    return {
        type: "SET_ADDRESS",
        payload: address
    }
}

export const setDate = (date) => {
    return {
        type: "SET_DATE",
        payload: date
    }
}

export const setNightNumber = (nightNumber) => {
    return {
        type: "SET_NIGHT_NUMBER",
        payload: nightNumber
    }
}

export const setPersonsAndRooms = (data) => {
    return {
        type: "SET_PERSON_ROOM",
        payload: data
    }
}

export const setFilter = (filter) => {
    return {
        type: "SET_FILTER",
        payload: filter
    }
}