import { createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../../../assets/assets";
import axios from "axios";

export const fetchDashbord = createAsyncThunk(
    "fetchDashboards",
    async (_, thunkArg) => {
        try {
            const response = await axios.get(`${url}/api/dashboard/get`);
            const data = {
                ...response.data
            };

            delete data.success;

            return data;
        } catch(error) {
            return thunkArg.rejectWithValue(error.message);
        }
    }
)