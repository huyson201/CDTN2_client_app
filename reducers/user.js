let initialState = {
  currentUser: null,
  isRemembered: false,
  token: null,
  checkPickerImage: false,
  file: null
};
const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      console.log(action.payload);
      let newUser = action.payload;
      state = { ...state, currentUser: newUser };
      return state;
    case 'SET_REMEMBER_ME':
      let rememberMe = action.payload;
      state = { ...state, isRemembered: rememberMe };
      return state;
    case 'SET_TOKEN':
      state = { ...state, token: action.payload };
      return state;
    case 'SET_IMAGE':
      state = { ...state, checkPickerImage: action.payload };
      return state;
    case 'SET_FILE':
      state = { ...state, file: action.payload };
      return state;
    default:
      return state;
  }
};

export default userReducer;
