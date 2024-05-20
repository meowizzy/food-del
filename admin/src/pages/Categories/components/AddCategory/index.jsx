import { useForm } from "react-hook-form";
import cls from "./AddCategory.module.css";
import { url } from "../../../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import cn from "classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../services/fetchCategories";

export const AddCategory = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post(`${url}/api/categories/create`, data);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast(response.data.message);
            reset({ name: "" });
            dispatch(fetchCategories());
        } catch(e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.addForm}>
            <div className={cls.formField}>
                <label>
                    { errors.name && <span className={cls.error}>This field is required</span> }
                    <input 
                        placeholder="Category name"
                        {...register("name", { required: true })} 
                    />
                </label>
            </div>
            <button className={cn(cls.submit, { [cls.loading]: loading })}>
                Add
            </button>
        </form>
    );
};