import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductsSlice from "./admin/product-slice/index.js";
import shopProductSlice from "./shop/products-slice/index.js"
const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shopProducts : shopProductSlice,
    }
});
export default store;