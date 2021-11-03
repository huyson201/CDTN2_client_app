export const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER",
        payload: user
    }
}
export const setRememberMe = (value) => {
    return {
        type: "SET_REMEMBER_ME",
        payload: value
    }
}
export const setToken = (value) => {
    return {
        type: "SET_TOKEN",
        payload: value
    }
}