let initialState = {
  currentUser: null,
  isRemembered: false,
};
const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      console.log(action.payload)
      let newUser = action.payload;
      state = {...state, currentUser: newUser};
      return state;
    case 'SET_REMEMBER_ME':
      let rememberMe = action.payload;
      state = {...state, isRemembered: rememberMe};
      return state;
    default:
      return state;
  }
};

export default userReducer;