import { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { getMyBookings } from "../../services/booking";
import cls from "./Bookings.module.css";
import cn from "classnames";
import { CURRENCY, baseUrl } from "../../api/constants";
import { ButtonUI } from "../../components/ui/ButtonUI";

export const bookingStatuses = {
    ACCEPTED: "ACCEPTED",
    CANCELED: "CANCELED"
}

export const BookingPage = () => {
    const { myBookings, setMyBookings } = useContext(StoreContext);

    useEffect(() => {
        getMyBookings(setMyBookings, myBookings);
    }, []);

    if (myBookings.isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (myBookings.error) {
        return (
            <h1>{myBookings.error}</h1>
        )
    }

    if (myBookings._inited && !myBookings.data.length) {
        return (
            <h1>You have no bookings!</h1>
        );
    }

    return (
        <>
            <h1>My bookings</h1>
            <div className={cls.bookings}>
                {
                    myBookings.data.map(booking => (
                        <div className={cls.bookingItem} key={booking._id}>
                            <div className={cls.bookingFoods}>
                            {
                                booking?.items.map(item => (
                                    <div className={cls.bookingFoodsItem} key={item._id}>
                                        <div className={cls.bookingFoodsItemPic}>
                                            <img src={baseUrl+"/images/"+item.image} alt="" />
                                        </div>
                                        <div className={cls.bookingFoodsItemName}>
                                            <span className={cls.bookingFoodsItemLabel}>Name: </span>
                                            <span className={cls.bookingFoodsItemValue}>{item.name}</span>
                                        </div>
                                        <div className={cls.bookingFoodsItemPrice}>
                                            <span className={cls.bookingFoodsItemLabel}>Total: </span>
                                            <span className={cls.bookingFoodsItemValue}>{CURRENCY}{item.price}</span>
                                        </div>
                                        <div className={cls.bookingFoodsItemQuantity}>
                                            <span className={cls.bookingFoodsItemLabel}>Quantity: </span>
                                            <span className={cls.bookingFoodsItemValue}>{item.quantity}</span>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                            <ul className={cls.bookingInfo}>
                                <li>
                                    <span className={cls.label}>Booking date: </span>
                                    <span className={cls.value}>{booking.date}</span>
                                </li>
                                <li>
                                    <span className={cls.label}>Booking time: </span>
                                    <span className={cls.value}>{booking.time}</span>
                                </li>
                                <li>
                                    <span className={cls.label}>Number of seats:</span>
                                    <span className={cls.value}>{booking.seats}</span>
                                </li>
                                <li>
                                    <span className={cls.label}>Table number:</span>
                                    <span className={cls.value}>{booking.table}</span>
                                </li>
                                <li>
                                    <span className={cls.label}>Status:</span>
                                    <span className={cn(cls.value, {
                                        ["success"]: booking.status === bookingStatuses.ACCEPTED,
                                        ["reject"]: booking.status === bookingStatuses.CANCELED
                                    })}>{booking.status}</span>
                                </li>
                                {/* {booking.status === bookingStatuses.CANCELED &&
                                    <li>
                                        <ButtonUI text="Delete"/>
                                    </li>
                                } */}
                            </ul>
                        </div>
                    ))
                }
            </div>
        </>
    )
};