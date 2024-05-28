import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "../services/fetchProduct";
import { updateProduct } from "../services/updateProduct";

const initialState = {
    id: undefined,
    data: undefined,
    formData: undefined,
    loading: false,
    error: undefined
};

export const productSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        reset: (state, action) => {
            state.data = undefined;
            state.id = undefined;
            state.loading = false;
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state, action) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = undefined;
            state.data = action.payload;
        });
        builder.addCase(updateProduct.pending, (state, action) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = undefined;
            state.data = action.payload;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { actions: productActions } = productSlice;
export const { reducer: productReducer } = productSlice;