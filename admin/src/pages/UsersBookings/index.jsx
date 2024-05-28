import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { assets, url } from '../../assets/assets';
import { toast } from "react-toastify";
import axios from "axios";
import cls from "./UsersBookings.module.css";
import cn from "classnames";

export const BOOKING_STATUSES = {
    ACCEPTED: "ACCEPTED",
    CANCELED: "CANCELED" 
}

export const UsersBookings = () => {
    const { id } = useParams();
    const [updateStatusData, setUpdateStatusData] = useState({});
    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const fetchBookings = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${url}/api/booking/bookingsById/${id}`);

            setData(response.data.data);
            setIsLoading(false);
        } catch(e) {
            setError(e.message);
            toast.error(e.message);
            setIsLoading(false);
        }
    };

    const updateStatus = async (data) => {
        try {
            setUpdateStatusData((prevState) => {
                return { ...prevState, [data.id]: { ...prevState, loading: true } };
            });
            const response = await axios.put(`${url}/api/booking/updateStatus`, data);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            setUpdateStatusData((prevState) => {
                return { ...prevState, [data.id]: { ...data, loading: false } };
            });
            toast.success(`Status for ${data.id} successfully changed.`);
        } catch(e) {
            toast.error(e.message);
            setError(e.message);
            setIsLoading(false);
        }
    };

    const handleChangeStatusSelect = (id, status) => {
        const data = {
            id, 
            status
        };
        updateStatus(data);
    };

    const deleteRecource = async (id) => {
        try {
            const response = await axios.delete(`${url}/api/booking/delete/${id}`);
            console.log(response)
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            fetchBookings();

        } catch(e) {
            toast.error(e.message);
        }
    }

    useEffect(() => {
        fetchBookings();
    },[]);

    if (isLoading) {
        return (
            <div className="add">
                <h3>User Bookings</h3>
                <h4>Loading...</h4>
            </div>
        )
    }

    if (error) {
        return (
            <div className="add">
                <h3>User Bookings</h3>
                <h4>{error}</h4>
            </div>
        )
    }

    if (!data?.length) {
        return (
            <div className="user bookings add">
                <h3>User bookings - #{id}</h3>
                <div className={cls.empty}>No data</div>
            </div>
        )
    }  

    return (
        <div className="user bookings add">
            <h3 className={cls.title}>
                <Link to="/bookings">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 476.213 476.213" xmlSpace="preserve">
                        <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5   57.427,253.107 476.213,253.107 "/>
                    </svg>
                </Link>
                User bookings - #{id}
            </h3>
            <div className={cls.bookingList}>
                {data?.map(item => (
                    <div className={cls.bookingRow} key={item._id}>
                        <div className={cls.bookingColumnLeft}>
                            <ul className={cls.bookingsInfo}>
                                <li>
                                    <span className={cls.label}>Table number: </span>
                                    <span className={cls.value}>{item.table}</span>
                                </li>
                                <li>
                                    <span className={cls.label}>Number of seats: </span>
                                    <span className={cls.value}>{item.seats}</span>
                                </li>
                                <li>
                                    <span className={cls.label}>Date: </span>
                                    <span className={cls.value}>{item.date}</span>
                                </li>
                                <li>
                                    <span className={cls.label}>Time: </span>
                                    <span className={cls.value}>{item.time}</span>
                                </li>
                                <li>
                                    <span className={cls.label}>Status: </span>
                                    <span className={cn(cls.select, { [cls.loading]: updateStatusData[item._id]?.loading })}>
                                        <select value={updateStatusData[item._id]?.status || item.status} onChange={(e) => handleChangeStatusSelect(item._id, e.target.value)}>
                                            <option value={BOOKING_STATUSES.ACCEPTED}>{BOOKING_STATUSES.ACCEPTED}</option>
                                            <option value={BOOKING_STATUSES.CANCELED}>{BOOKING_STATUSES.CANCELED}</option>
                                        </select>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className={cls.bookingColumnRight}>
                            {
                                item.items.map(cartItem => (
                                    <div className={cls.bookingProduct} key={cartItem._id}>
                                        <div className={cls.bookingPic}>
                                            <img src={`${url}/images/${cartItem.image}`} alt={cartItem.name} />
                                        </div>
                                        <div className={cls.bookingName}>
                                            <span className={cls.label}>Product name: </span>
                                            <span className={cls.value}>{cartItem.name}</span>
                                        </div>
                                        <div className={cls.bookingPrice}>
                                            <span className={cls.label}>Price: </span>
                                            <span className={cls.value}>{cartItem.price}$</span>
                                        </div>
                                        <div className={cls.productQuantity}>
                                            <span className={cls.label}>Quantity: </span>
                                            <span className={cls.value}>{cartItem.quantity}</span>
                                        </div>
                                    </div>
                                ))
                            }

                            <button 
                                className={cls.delete}
                                onClick={() => deleteRecource(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div> 
                ))}
            </div>
        </div>
    )
};