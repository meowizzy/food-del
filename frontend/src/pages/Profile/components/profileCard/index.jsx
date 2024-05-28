import { useContext } from "react";
import { StoreContext } from "../../../../Context/StoreContext";
import { ProfileButtons } from "../profileButtons";
import { Link } from "react-router-dom";
import UserIcon from "../../../../assets/userName.svg";
import EmailIcon from "../../../../assets/emailIcon.svg";
import PhoneIcon from "../../../../assets/phoneIcon.svg";
import BookingIcon from "../../../../assets/booking.svg";
import OrderIcon from "../../../../assets/order.svg";
import cls from "./ProfileCard.module.css";
import cn from "classnames";

export const ProfileCard = ({ setReadonly }) => {
    const { profileData: { data, isLoading, error } } = useContext(StoreContext);

    if (!Object.keys(data).length) {
        return (
            <h3>Loading...</h3>
        )
    }

    return (
        <>
            <div className={cls.cardLists}>
                <ul className={cls.column}>
                    <li>
                        <span className={cls.name}>
                            <img src={UserIcon} />
                            Name: 
                        </span>
                        <span className={cls.value}>{data?.name}</span>
                    </li>
                    <li>
                        <span className={cls.name}>
                            <img src={EmailIcon} />
                            Email: 
                        </span>
                        <span className={cls.value}>{data?.email}</span>
                    </li>
                    <li>
                        <span className={cls.name}>
                            <img src={PhoneIcon} />
                            Phone: 
                        </span>
                        <span className={cls.value}>{data?.phone || "-"}</span>
                    </li>
                </ul>
                <ul className={cls.column}>
                    <li>
                        <span className={cls.name}>City: </span>
                        <span className={cls.value}>{data?.city || "-"}</span>
                    </li>
                    <li>
                        <span className={cls.name}>Street: </span>
                        <span className={cls.value}>{data?.street || "-"}</span>
                    </li>
                    <li>
                        <span className={cls.name}>State: </span>
                        <span className={cls.value}>{data?.state || "-"}</span>
                    </li>
                    <li>
                        <span className={cls.name}>Country: </span>
                        <span className={cls.value}>{data?.country || "-"}</span>
                    </li>
                    <li>
                        <span className={cls.name}>ZIP Code: </span>
                        <span className={cls.value}>{data?.zipCode || "-"}</span>
                    </li>
                </ul>
                <ul className={cn(cls.column, cls.linksColumn)}>
                    <li>
                        <Link to="/bookings" className={cls.link}>
                            <img className={cls.icon} src={BookingIcon} /> 
                            My bookings
                        </Link>
                    </li>
                    <li>
                        <Link to="/myorders" className={cls.link}>
                            <img className={cls.icon} src={OrderIcon} /> 
                            My orders
                        </Link>
                    </li>
                </ul>
            </div>
            <ProfileButtons setReadonly={setReadonly}/>
        </>
    )
};