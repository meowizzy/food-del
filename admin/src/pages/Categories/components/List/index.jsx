import { useState } from "react";
import { url } from "../../../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import cls from "./List.module.css";
import cn from "classnames";
import { fetchCategories } from "../../services/fetchCategories";

export const List = (props) => {
    const {
        data,
        error
    } = props;
    const dispatch = useDispatch();

    const [itemLoading, setItemLoading] = useState(false);
    const [itemError, setItemError] = useState(undefined);
    const [updateImage, setUpdateImage] = useState(undefined);
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

    const updateName = async (id, name) => {
        try {
            setItemLoading(true);
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("image", updateImage);
            const response = await axios.put(`${url}/api/categories/update`, formData);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast("Category updated successfully!");
            setReadOnly(undefined);

            dispatch(fetchCategories());
            setUpdateImage(undefined);
        } catch(error) {
            setItemError(error.message);
        } finally {
            setItemLoading(false);
        }
    }

    const onCancelUpdate = () => {
        setReadOnly(undefined);
        setUpdateImage(undefined);
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
                                        <span className={cls.pic}>
                                            {item.image && <img src={`${url}/images/${item.image}`} alt=""/>}
                                        </span>
                                        <span>{item.name}</span>
                                        <span> ({item.totalItems})</span>
                                    </> :
                                    <div className={cls.updateNameRow}>
                                        <label htmlFor="update_image">
                                            <span className={cls.pic}>
                                                <img src={updateImage ? URL.createObjectURL(updateImage) : `${url}/images/${item.image}`} alt=""/>
                                            </span>
                                        </label>
                                        <input
                                            id="update_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setUpdateImage(e.target.files[0])}
                                            hidden
                                        />
                                        <input className={cls.input} type="text" value={name || item.name}
                                               onChange={handleChangeInput}/>
                                        <button className={cls.delete} onClick={() => updateName(item._id, item.name)}>Save
                                        </button>
                                        <button className={cls.delete} onClick={onCancelUpdate}>Cancel
                                        </button>
                                    </div>
                            }
                        </div>
                        <div className={cn(cls.col, cls.edit)}>
                            <button onClick={() => setReadOnly(item._id)}>Edit</button>
                        </div>
                        <div className={cn(cls.col, cls.delete)}>
                            <button
                                onClick={() => deleteCategory(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};