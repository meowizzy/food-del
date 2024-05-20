import { createSlice } from "@reduxjs/toolkit";
import { fetchDashbord } from "../services/fetchDashboard";

const initialState = {
    loading: false,
    error: undefined,
    data: undefined
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDashbord.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchDashbord.fulfilled, (state, action) => {
            state.loading = false;
            state.error = undefined;
            state.data = action.payload;
        });
        builder.addCase(fetchDashbord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { actions: dashboardActions } = dashboardSlice;
export const { reducer: dashboardReducer } = dashboardSlice;