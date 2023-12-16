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
  unitMeasurementSlice,
  orderSlice,
  branchOfficeSlice,

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
    unitMeasurements: unitMeasurementSlice.reducer,
    kardexProducts: kardexProductSlice.reducer,
    orders: orderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})