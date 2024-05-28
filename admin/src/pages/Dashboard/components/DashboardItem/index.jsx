import { Link } from "react-router-dom";
import cls from "./DashboardItem.module.css";
import cn from "classnames";

export const DashboardItem = (props) => {
    const {
        count = 0,
        title,
        link = "/",
        isLoading,
        className
    } = props;


    return (
        <div className={cn(cls.item, className)}>
            <div className={cls.itemHead}>
                {title}
            </div>
            <div className={cls.itemBody}>
                <Link to={link} className={cls.link}> 
                    <span className={cls.count}>
                        { isLoading ? <span className={cls.spinner}></span> : count }
                    </span>
                </Link>
            </div>
        </div>
    );
};