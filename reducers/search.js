let initialState = {
    address: "",
    data: "",
    personAndRoom: {
        room: 1,
        adults: 1,
        children: 0
    },
    filter: {}
}
const searchReducer = function (state = initialState, action) {
    if (!action) return state
    switch (action) {
        case "SET_PERSON_ROOM":
            let newState = { ...state }
            newState.personAndRoom = action.payload
            return state
        default:
            return state
    }
}

export default searchReducer;