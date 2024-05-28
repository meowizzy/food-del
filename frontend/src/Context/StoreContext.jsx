import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { baseUrl } from "../api/constants";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const navigate = useNavigate();
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const [categoriesData, setCategoriesData] = useState({
        data: [],
        error: undefined,
        isLoading: false,
        _inited: false
    });
    const [profileData, setProfileData] = useState({
        data: {},
        error: undefined,
        isLoading: false,
        _inited: false
    });
    const [myBookings, setMyBookings] = useState({
        data: [],
        error: undefined,
        isLoading: false,
        _inited: false
    });
    const [allBookings, setAllBookings] = useState({
        data: [],
        error: undefined,
        isLoading: false,
        _inited: false
    });

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(baseUrl + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(baseUrl + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo?.price) {
                    totalAmount += Number(itemInfo?.price) * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchCategories = async () => {
        try {
            setCategoriesData({ ...categoriesData, isLoading: true });
            const response = await axios.get(`${baseUrl}/api/categories/all`);

            if (!response.data.success) {
                throw new Error("Failed to fetch categories.")
            }

            setCategoriesData({ ...categoriesData, data: response.data.categories, isLoading: false });
        } catch (e) {
            toast.error(e.message);
            setCategoriesData({ ...categoriesData, error: e.message, isLoading: false });
        }
    };

    const fetchFoodList = async () => {
        const response = await axios.get(baseUrl + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(baseUrl + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

    const getProfile = async () => {
        const response = await axios.get(baseUrl + "/api/user/profile", {
            headers: {
                authorization: localStorage.getItem("token")
            }
        });

        setProfileData({ ...profileData, data: response.data.data });
    }

    const updateProfileData = async (data) => {
        try {
            setProfileData({ ...profileData, isLoading: true })
            const response = await axios.patch(baseUrl + `/api/user/profile/${token}`, data);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            setProfileData({ data: response.data.data, isLoading: false, error: undefined, _inited: true });

            toast("Profile successfully updated!");

            return response.data.data;
        } catch(e) {
            toast.error(e.message);
            setProfileData({ ...profileData, error: e.message, isLoading: false });
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                getProfile();
                setToken(localStorage.getItem("token"))
                await loadCartData({ token: localStorage.getItem("token") })
            }
        }
        loadData()
    }, [myBookings]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const contextValue = {
        baseUrl,
        food_list,
        menu_list,
        categoriesData,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        profileData,
        token,
        setToken,
        loadCartData,
        setCartItems,
        updateProfileData,
        myBookings,
        setMyBookings,
        allBookings,
        setAllBookings
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;