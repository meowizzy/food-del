import { createBooking, getAllBookings } from '../../../../services/booking';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { StoreContext } from '../../../../Context/StoreContext';
import { DatePicker, TimePicker, InputNumber } from 'antd';
import { ButtonUI, ButtonUITheme } from "../../../../components/ui/ButtonUI";
import cls from "./Booking.module.css";
import cn from "classnames";


export const Booking = (props) => {
    const navigate = useNavigate();
    const {
        className
    } = props;
    const { 
        myBookings, 
        setMyBookings, 
        allBookings, 
        setAllBookings,
        cartItems,
        food_list
    } = useContext(StoreContext);
    const [data, setData] = useState({
        table: undefined,
        date: undefined,
        time: undefined,
        seats: 2,
    });
    const [bookedTables, setBooketTables] = useState(undefined);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        getAllBookings(setAllBookings, allBookings);
    }, []);

    const findAndSetBookedTables = (date, time) => {
        const bookedTables = [];

        allBookings.data.forEach(item => {
            const parsedTime = Number(item.time.split(":")[0]);
            if (item.date === date && (parsedTime === time || time <= parsedTime + 3)) {
                bookedTables.push(item.table);
            }

            if (item.table === data.table) {
                setData({ ...data, table: undefined });
            }
        });

        if (bookedTables.length) {
            setBooketTables(bookedTables);
        } else {
            setBooketTables(undefined);
        }
    }

    const handleSelectTable = (table) => {
        if (!data.time) {
            setErrors([ "Please select the time" ]);
            return;
        } else if (!data.time) {
            setErrors([ "Please select the date" ]);
            return;
        } else {
            setErrors([]);
        }
        setData({ ...data, table });
    };

    const handleChangeDate = (d, date) => {
        setData({ ...data, date });
        findAndSetBookedTables(date, data.time);
    };

    const handleChangeTime = (t, time) => {
        setData({ ...data, time });
        findAndSetBookedTables(data.date, t.$H);
    };

    const handleChangeSeats = (seats) => {
        setData({ ...data, seats })
    };

    const onCancel = () => {
        setData({
            table: undefined,
            date: undefined,
            time: undefined,
            seats: undefined,
        })
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!data.table && !data.date && !data.time) {
            setErrors([ "Fill in required fields." ]);
            return;
        } else if (!data.table) {
            setErrors([ "Please select the table" ]);
        } else if (!data.date) {
            setErrors([ "Please select the date" ]);
        } else if (!data.time) {
            setErrors([ "Please select the time" ]);
        } else if (!data.seats) {
            setErrors([ "Please select the number of seats" ]);
        } else {
            setErrors([]);
        }

        if (errors.length) return;

        const orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        const newData = { ...data, items: orderItems }
        
        createBooking(newData, setMyBookings, myBookings, navigate);
    };

    return (
        <div className={cn(cls.wrapper, className, { [cls.loading]: allBookings.isLoading })}> 
            {
               errors.length ? <ul className={cls.errors}>
                    {
                        errors.map(error => (
                            <li key={error}>{error}</li>
                        ))
                    }
                </ul> : ""
            }
            <div className={cls.bookingCols}>
                <div className={cls.bookingCol}>
                    <div className={cls.bookingTitle}>
                        Select a table
                    </div>
                    <div className={cls.tables}>
                        {
                            Array(36).fill(undefined).map((item, index) => (
                                <button 
                                    disabled={bookedTables?.find(table => table === index+1) || !data.date && !data.time}
                                    className={cn(cls.table, { [cls.selected]: data?.table === index+1 })} 
                                    key={index}
                                    onClick={(e) => handleSelectTable(index+1)}
                                >
                                        {index+1}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className={cls.bookingCol}>
                    <div className={cls.bookingRow}>
                        <div className={cls.bookingTitle}>
                            Date
                        </div>
                        <DatePicker 
                            value={data.date && dayjs(data.date)}
                            onChange={handleChangeDate}
                        />
                    </div>
                    <div className={cls.bookingRow}>
                        <div className={cls.bookingTitle}>
                            Time
                        </div>
                        <TimePicker 
                            format={"HH:mm"} 
                            value={data.time && dayjs(data.time, 'HH:mm')}
                            onChange={handleChangeTime}
                        />
                    </div>
                    <div className={cls.bookingRow}>
                        <div className={cls.bookingTitle}>
                            Number of seats
                        </div>
                        <InputNumber 
                            min={1} 
                            max={6} 
                            defaultValue={data.seats}
                            value={data.seats}
                            onChange={handleChangeSeats}
                        />
                    </div>
                </div>
                <div className={cn(cls.bookingCol, cls.bookingColDesc)}>
                    <b>Table booking.</b><br/>
                    Please select your booking date and time and then select your table.
                    Tables for the specified date and time may be occupied, you can choose another day or the time you choose + 3 hours. Tables become available within three hours.
                </div>
            </div>
            <div className={cls.btns}>
                <ButtonUI 
                    onClick={onCancel}
                    text="Cancel"
                    theme={ButtonUITheme.SECONDARY}
                    className={cls.bookingSubmit}
                    disabled={!data.table && !data.seats && !data.time && !data.date}
                />
                <ButtonUI 
                    onClick={onSubmit}
                    text="Book a table"
                    isLoading={myBookings.isLoading}
                    theme={ButtonUITheme.PRIMARY}
                    className={cls.bookingSubmit}
                />
            </div>
        </div>
        
    );
};