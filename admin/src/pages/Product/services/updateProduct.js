import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../../assets/assets";
import { toast } from "react-toastify";

export const updateProduct = createAsyncThunk(
    "product/update",
    async (_, thunkApi) => {
        try {
            const { productReducer } = thunkApi.getState();

            const response = await axios.put(`${url}/api/food/list/${productReducer.id}`, productReducer.formData);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Product successfully updated!");

            console.log(response.data)

            return response.data.data;
        } catch(error) {
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.message);
        }
    }
);