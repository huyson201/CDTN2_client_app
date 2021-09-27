export const getTomorrow = (currentDate, num = 1) => {
    let currentDay = new Date(currentDate)
    let nextDay = new Date(currentDay)
    nextDay.setDate(currentDay.getDate() + num)
    return getDateFormatString(nextDay)
}

const dayOfWeeks = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
export const convertDateToVNDate = (date) => {
    if (!date) return ""
    let nDate = new Date(date)
    let arrDate = date.split("/")
    let dayOfWeek = dayOfWeeks[nDate.getDay()]
    return `${dayOfWeek}, ${arrDate[2]} Thg ${arrDate[1]} ${arrDate[0]}`
}

export const getDateFormatString = (date) => {

    let strDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    return strDate;
}

export const convertStrPersonRooms = (data) => {
    if (!data) return

    return `${data.rooms} Phòng, ${data.adults} Người Lớn, ${data.children} Trẻ em`
}


export const formatCurrency = (n, currency) => {
    return (currency + " " + n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')).slice(0, -2);
}
