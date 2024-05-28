import { createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../../../../assets/assets";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, thunkApi) => {
        try {
            const { categoriesReducer } = thunkApi.getState();
            const response = await axios.get(`${url}/api/categories/pageable-list`, {
                params: {
                    page: categoriesReducer.currentPage,
                    limit: categoriesReducer.limit,
                    search: categoriesReducer.search
                }
            });

            const data = {
                data: response.data.categories[0].docs,
                totalPages: response.data.totalPages
            }

            return {...data};
        } catch(error) {

            return thunkApi.rejectWithValue(error.message);
        }
    }
);