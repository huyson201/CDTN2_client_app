
let initialState = {
    user: {
      name: '',
      email: '',
      phoneNumber: '',
      isLogged: false,
    },
  };
  const userReducer = function (state = initialState, action) {
    switch (action.type) {
      case "SET_USER":
        state = { ...state, personsAndRooms: action.payload };
        return state;
      default:
        return state;
    }
  };
  
  export default userReducer;