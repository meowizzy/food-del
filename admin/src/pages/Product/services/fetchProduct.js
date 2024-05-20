import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../../assets/assets";

export const fetchProduct = createAsyncThunk(
    "product/fetch",
    async (_, thunkApi) => {
        try {
            const state = thunkApi.getState();

            const response = await axios.get(`${url}/api/food/list/${state.productReducer.id}`);

            return response.data.data;
        } catch(error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);