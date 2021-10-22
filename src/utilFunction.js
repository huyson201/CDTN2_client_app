export const getTomorrow = (currentDate, num = 1) => {
  let currentDay = new Date(currentDate);
  let nextDay = new Date(currentDay);
  nextDay.setDate(currentDay.getDate() + num);
  return getDateFormatString(nextDay);
};

const dayOfWeeks = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
export const convertDateToVNDate = (date) => {
  if (!date) return "";
  let nDate = new Date(date);
  let arrDate = date.split("/");
  let dayOfWeek = dayOfWeeks[nDate.getDay()];
  return `${dayOfWeek}, ${arrDate[2]} Thg ${arrDate[1]} ${arrDate[0]}`;
};

export const getDateFormatString = (date) => {
  let strDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;
  return strDate;
};

export const convertDateToStringForForRoom = (dateReceived, datePay) => {
  if (!dateReceived && !datePay) return "";
  let arrReceivedDate = dateReceived.split("/");
  let arrPayDate = datePay.split("/");
  let strDate = "";
  if (arrReceivedDate[1] != arrPayDate[1]) {
    strDate = `${arrReceivedDate[2]} Thg ${arrReceivedDate[1]} - ${arrPayDate[2]} Thg ${arrPayDate[1]} ${arrPayDate[0]}`;
  } else {
    strDate = `${arrReceivedDate[2]} - ${arrPayDate[2]} Thg ${arrPayDate[1]} ${arrPayDate[0]}`;
  }
  return strDate;
};

export const convertStrPersonRooms = (data) => {
  if (!data) return;

  return `${data.rooms} Phòng, ${data.adults} Người Lớn, ${data.children} Trẻ em`;
};

export const formatCurrency = (n, currency) => {
  return (
    currency +
    " " +
    n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
  ).slice(0, -2);
};

// xoa dau tieng viet
export function xoaDau(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}
