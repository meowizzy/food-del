import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash"
import { categoriesActions } from "../../categoriesSlice";
import cls from "./SearchCategories.module.css";
import { useEffect } from "react";
import { useState } from "react";

export const SearchCategories = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    const handleSearchWithDebounce = debounce((e) => {
        setQuery(e.target.value);
    }, 500);

    useEffect(() => {
        dispatch(categoriesActions.setQuery(query));
        return () => {
            dispatch(categoriesActions.setQuery(""));
            dispatch(categoriesActions.setCurrentPage(1));
        }
    }, [query]);

    return (
        <div className={cls.formField}>
            <label>
                <input 
                    placeholder="Search"
                    name="search"
                    onChange={handleSearchWithDebounce}
                />
            </label>
        </div>
    );
};