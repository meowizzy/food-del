import { useEffect, useMemo } from "react";
import { DashboardItem } from "./components/DashboardItem";
import { fetchDashbord } from "./services/fetchDashboard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import cls from "./Dashboard.module.css";
import cn from "classnames";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.dashboardReducer);

    useEffect(() => {
        dispatch(fetchDashbord());
    }, []);

    console.log(data);

    if (error) {
        toast.error(error);
        return (
            <div className="dashboard add">
                <h3>Dashboard</h3>
                <div className={cls.error}>
                    {error}
                </div>
            </div>
        )
    }

    const localData = useMemo(() => {
        return [
            {
                title: "Categories",
                count: data?.categoriesTotal,
                link: "/categories"
            },
            {
                title: "Products",
                count: data?.foodsTotal,
                link: "/list"
            },
            {
                title: "Orders",
                count: data?.ordersTotal,
                link: "/orders"
            },
            {
                title: "Bookings",
                count: data?.bookingsTotal,
                link: "/bookings"
            }
        ];
    }, [data]);

    return (
        <div className="dashboard add">
            <h3>Dashboard</h3>
            <div className={cls.grid}>
                {
                    localData.map(({ count, link, title }, index) => (
                        <DashboardItem 
                            key={index}
                            count={count}
                            link={link}
                            title={title}
                            isLoading={loading}
                        />
                    ))
                }
            </div>
        </div>
    );
};