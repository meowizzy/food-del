import { configureStore } from '@reduxjs/toolkit'
import { categoriesReducer } from "../pages/Categories/categoriesSlice";
import { productReducer } from "../pages/Product/slice/productSlice";
import { dashboardReducer } from "../pages/Dashboard/slice/dashboardSlice";

export const store = configureStore({
  reducer: {
    categoriesReducer,
    productReducer,
    dashboardReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})