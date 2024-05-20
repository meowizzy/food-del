import { toast } from 'react-toastify'
import { baseUrl } from '../api/constants';
import axios from 'axios';

export const getMyBookings = async (setData, data) => {
    try {
        setData({ ...data, isLoading: true });
        const response = await axios.get(`${baseUrl}/api/booking/my`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });

        setData({ 
            ...data, 
            data: response.data.data,
            isLoading: false, 
            _inited: true, 
            error: undefined 
        });

    } catch(e) {
        toast.error(e.message);
        setData({ ...data, isLoading: false, error: e.message });
    }
};

export const createBooking = async (data, setMyBookings, myBookings, navigate) => {
    try {
        setMyBookings({ ...myBookings, isLoading: true })
        const response = await axios.post(baseUrl + "/api/booking/create", data, {
             headers: { token: localStorage.getItem("token") } 
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        setMyBookings({ ...myBookings, isLoading: false, _inited: true })

        toast("You have successfully booked a table!");

        navigate("/bookings");
    } catch(e) {
        toast.error(e.message);
        setMyBookings({ ...myBookings, isLoading: false, error: e.message })
    }
};

export const getAllBookings = async (setAllBookings, allBookings) => {
    try {
        const response = await axios.get(`${baseUrl}/api/booking/all`);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        setAllBookings({ 
            ...allBookings, 
            data: response.data.data,
            isLoading: false, 
            _inited: true, 
            error: undefined 
        });
    } catch(e) {
        toast.error(e.message);
        setAllBookings({ ...allBookings, isLoading: false, error: e.message })
    }
}