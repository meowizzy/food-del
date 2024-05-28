import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { assets, url } from '../../assets/assets';
import { fetchProduct } from "./services/fetchProduct";
import { productActions } from "./slice/productSlice";
import { updateProduct } from "./services/updateProduct";
import { Link } from "react-router-dom";
import cn from "classnames";
import cls from "./Product.module.css";

const buildImagePath = (src) => {
    if (src.includes("blob")) {
        return src;
    }
    return `${url}/images/${src}`;
};

export const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading } = useSelector(state => state.productReducer);
    const categories = useSelector(state => state.categoriesReducer);
    const imageRef = useRef();
    const [formData, setFormData] = useState({
        name: "",
        price: 25,
        category: "",
        description: "",
        image: ""
    });

    useEffect(() => {
        dispatch(productActions.setId(id));
        dispatch(fetchProduct());

        return () => {
            dispatch(productActions.reset());
        };
    }, []);

    const handleChangeImage = (e) => {
        imageRef.current.target = e.target;
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleChangeName = (e) => {
        setFormData({ ...formData, name: e.target.value });
    };

    const handleChangeDescription = (e) => {
        setFormData({ ...formData, description: e.target.value });
    };

    const handleChangePrice = (e) => {
        setFormData({ ...formData, price: e.target.value });
    };

    const handleSetFormData = (e) => {
        const form_data = new FormData();

        form_data.append("image", formData.image);
        form_data.append("name", formData.name);
        form_data.append("price", formData.price);
        form_data.append("category", formData.category);
        form_data.append("description", formData.description);

        console.log(form_data);

        dispatch(productActions.setFormData(form_data));
        dispatch(updateProduct());
    };

    const handleChangeCategory = (e) => {
        setFormData({ ...formData, category: e.target.value });
    };

    return (
        <div className={cn("add", cls.wrap, { [cls.loading]: loading })}>
            <h3 className={cls.title}>
                <Link to="/list">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 476.213 476.213" xmlSpace="preserve">
                        <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5   57.427,253.107 476.213,253.107 "/>
                    </svg>
                    {data?.name}
                </Link>
            </h3>
            <div className='flex-col' >
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={buildImagePath((formData?.image && URL.createObjectURL(formData?.image)) || data?.image || assets.upload_area)} alt="" />
                    </label>
                    <input ref={imageRef} onChange={handleChangeImage} type="file" id="image" hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={handleChangeName} value={formData?.name || data?.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={handleChangeDescription} value={formData?.description || data?.description} type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={handleChangeCategory} value={formData?.category || data?.category}>
                            {
                                categories?.data?.map(item => (
                                    <option value={item._id} key={item._id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={handleChangePrice} value={formData?.price || data?.price} placeholder='$25' />
                    </div>
                </div>
                <button type='submit' className='add-btn' onClick={handleSetFormData}>SAVE</button>
            </div>
        </div>
    );
};