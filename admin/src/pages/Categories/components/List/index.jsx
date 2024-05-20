import { useState } from "react";
import { url } from "../../../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import cls from "./List.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../services/fetchCategories";

export const List = (props) => {
    const {
        data,
        error
    } = props;
    const dispatch = useDispatch();

    const [itemLoading, setItemLoading] = useState(false);
    const [itemError, setItemError] = useState(undefined);
    const [readOnly, setReadOnly] = useState(undefined);
    const [name, setName] = useState();

    // if (loading) {
    //     return (
    //         <h4>Loading...</h4>
    //     );
    // }

    if (error) {
        return (
            <h4>{error}</h4>  
        );
    }

    if (!data || !data.length) {
        return (
            <div className={cls.empty}>
                No data
            </div>
        );
    }

    const deleteCategory = async (id) => {
        try {
            setItemLoading(true);
            const response = await axios.delete(`${url}/api/categories/list/${id}`);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast("Category deleted successfully!");
            dispatch(fetchCategories());
        } catch(error) {
            setItemError(error.message);
        } finally {
            setItemLoading(false);
        }
    }

    const handleChangeInput = async (e) => {
        setName(e.target.value);
    }

    const updateName = async (id) => {
        try {
            setItemLoading(true);
            const response = await axios.patch(`${url}/api/categories/update`, {
                id,
                name
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast("Category updated successfully!");
            setReadOnly(undefined);
            fetchCategoryList();
        } catch(error) {
            setItemError(error.message);
        } finally {
            setItemLoading(false);
        }
    }

    return (
        <ul className={cls.list}>
            {
                data?.map(item => (
                    <li className={cls.listItem} key={item._id}>
                        <div className={cn(cls.col, cls.name)}>
                            {
                                item._id !== readOnly ?
                                <>
                                    {/* <Link to={`/category/${item._id}`} className={cls.link}>
                                       
                                    </Link> */}
                                    <span>{item.name}</span>
                                    <span> ({item.totalItems})</span>
                                </> : 
                                <div className={cls.updateNameRow}>
                                    <input className={cls.input} type="text" value={name || item.name} onChange={handleChangeInput}/> 
                                    <button className={cls.delete} onClick={() => updateName(item._id)}>Save</button>
                                    <button className={cls.delete} onClick={() => setReadOnly(undefined)}>Cancel</button>
                                </div>
                            }
                        </div>
                        <div className={cn(cls.col, cls.edit)}>
                            <button onClick={() => setReadOnly(item._id)}>Edit</button> 
                        </div>
                        <div className={cn(cls.col, cls.delete)}>
                            <button onClick={() => deleteCategory(item._id)}>Delete</button> 
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};