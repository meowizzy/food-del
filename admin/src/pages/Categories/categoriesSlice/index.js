import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../services/fetchCategories";

const initialState = {
    currentPage: 1,
    limit: 10,
    loading: false,
    search: "",
    data: undefined,
    totalPages: undefined,
    error: undefined
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        setQuery: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.error = undefined;
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.error = undefined;
            state.loading = false;
            state.data = action.payload.data;
            state.totalPages = action.payload.totalPages;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const { actions: categoriesActions } = categoriesSlice;
export const { reducer: categoriesReducer } = categoriesSlice;