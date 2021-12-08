import {
  getDateFormatString,
  getTomorrow,
  convertDateToStringForForRoom,
} from "../src/utilFunction";

let now = new Date();
let nowDate = getDateFormatString(now)
let tomorrow = getTomorrow(nowDate);
let initialState = {
  address: "ninh hai, ninh thuan",
  date: {
    numDate: 1,
    receivedDate: nowDate,
    payDate: tomorrow,
    dateString: convertDateToStringForForRoom(nowDate, tomorrow)
  },
  personsAndRooms: {
    rooms: 1,
    adults: 1,
    // children: 0
  },
  filter: {
    maxPrice: "10000000",
    minPrice: "0",
    rankStars: []
  }
}
const searchReducer = function (state = initialState, action) {
  switch (action.type) {
    case "SET_ADDRESS":
      let newAddress = action.payload;
      state = { ...state, address: newAddress };
      return state;

    case "SET_DATE":
      let receiverDate = action.payload;
      let payDate = getTomorrow(receiverDate, state.date.numDate);

      let newDate = {
        ...state.date,
        ["receivedDate"]: receiverDate,
        ["payDate"]: payDate,
        ["dateString"]: convertDateToStringForForRoom(receiverDate, payDate),
      };
      state = { ...state, date: newDate };
      return state;

    case "SET_NIGHT_NUMBER":
      payDate = getTomorrow(state.date.receivedDate, action.payload);
      let nDate = {
        ...state.date,
        ["payDate"]: payDate,
        ["dateString"]: convertDateToStringForForRoom(
          state.date.receivedDate,
          payDate
        ),
        numDate: action.payload,
      };
      state = { ...state, date: nDate };
      return state;

    case "SET_PERSON_ROOM":
      state = { ...state, personsAndRooms: action.payload };
      return state;
    case "SET_FILTER":
      let nFilter = { ...action.payload };
      state = { ...state, filter: nFilter };

      return state;
    default:
      return state;
  }
};

export default searchReducer;
