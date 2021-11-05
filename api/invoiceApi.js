import axiosClient from "./axiosClient";

const invoiceApi = {
    create: (Object) => {
        const url = "/invoices";
        return axiosClient.post(url, {
            price: Object.price,
            hotel_id: Object.hotelId,
            r_date: Object.rDate,
            p_date: Object.pDate,
            room_id: Object.roomId,
            room_quantity: Object.roomQty,
            status: Object.status
        }, {
            headers: {
                Authorization: `Bearer ${Object.token}`
              }
        });
    },
    getInvoices: (id) => {
        const url = `/invoices/${id}`;
        return axiosClient.get(url);
    },
    getInvoiceById: (id) => {
        const url = `/invoices/${id}`;
        return axiosClient.get(url);
    },
    getInvoiceByUser: (userId) => {
        const url = `/users/${userId}/invoices`;
        return axiosClient.get(url);
    },
    getInvoiceByHotel: (hotelId) => {
        const url = `/hotels/${hotelId}/invoices`;
        return axiosClient.get(url);
    },
};
export default invoiceApi;