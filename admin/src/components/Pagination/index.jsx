import { useDispatch } from "react-redux";
import { useMemo } from "react";
import cls from "./Pagination.module.css";
import cn from "classnames";

export const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const pages = useMemo(() => {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [totalPages, currentPage]);
    const dispatch = useDispatch();

    const handleChangePage = (curPage) => {
        dispatch(setCurrentPage(curPage))
    };

    return (
        <ul className={cls.pagination}>
            {
                pages.map(item => {
                    return (
                        <li key={item}>
                        <button 
                          onClick={() => handleChangePage(item)}
                          className={cn(cls.button, { [cls.active]: currentPage == item })}
                        >
                            {item}
                        </button>
                    </li>
                    )
                })
            }
        </ul>
    );
};