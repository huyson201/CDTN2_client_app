import axiosClient from './axiosClient'

const rating = {
    create: (data, token) => {
        const url = '/rates'
        return axiosClient.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

    getByUserAndHotel: (userId, hotelId) => {
        const url = '/rates'
        return axiosClient.get(url, {
            params: {
                user_uuid: userId,
                hotel_id: hotelId
            }
        })
    },
    update: (rateId, data, token) => {
        const url = `/rates/${rateId}`
        return axiosClient.patch(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default rating