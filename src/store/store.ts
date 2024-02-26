import { configureStore } from '@reduxjs/toolkit';
import { kardexProductSlice } from './kardexProduct/kardexProductSlice';
import {
  authSlice,
  customerSlice,
  permissionSlice,
  roleSlice,
  staffSlice,
  productSlice,
  categorySlice,
  orderSlice,
  branchOfficeSlice,
  measurementUnitSlice,
  reportSlice,
  cartSlice,

} from '.';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    branchOffices: branchOfficeSlice.reducer,
    permissions: permissionSlice.reducer,
    roles: roleSlice.reducer,
    staffs: staffSlice.reducer,
    customers: customerSlice.reducer,
    products: productSlice.reducer,
    categories: categorySlice.reducer,
    measurementUnits: measurementUnitSlice.reducer,
    kardexProducts: kardexProductSlice.reducer,
    orders: orderSlice.reducer,
    reports: reportSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})