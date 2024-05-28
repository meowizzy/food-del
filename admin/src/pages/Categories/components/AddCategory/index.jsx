import React, {useRef, useState} from "react";
import { useForm } from "react-hook-form";
import cls from "./AddCategory.module.css";
import {assets, url} from "../../../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../services/fetchCategories";

export const AddCategory = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState();
    const dispatch = useDispatch();
    const hiddenInputRef = useRef();
    const { ref: registerRef, ...rest } = register("image");
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("image", hiddenInputRef.current.files[0]);

            const response = await axios.post(`${url}/api/categories/create`, formData);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast(response.data.message);
            reset({
                name: "",
                image: ""
            });
            setPreview(undefined);
            dispatch(fetchCategories());
        } catch(e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.addForm}>
            <div className={cn(cls.formField, cls.fileUpload)}>
                <p>Upload image</p>
                <label htmlFor="image">
                    <img src={!preview ? assets.upload_area : preview} alt=""/>
                </label>
                <input
                    ref={(e) => {
                        registerRef(e?.files[0]);
                        hiddenInputRef.current = e;
                    }}
                    {...rest}
                    onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
                    type="file"
                    name="image"
                    id="image"
                    required
                    hidden
                />
            </div>
            <div className={cls.formField}>
                <label>
                    {errors.name && <span className={cls.error}>This field is required</span>}
                    <input
                        placeholder="Category name"
                        {...register("name", {required: true})}
                    />
                </label>
            </div>
            <button className={cn(cls.submit, {[cls.loading]: loading})}>
                Add
            </button>
        </form>
    );
};