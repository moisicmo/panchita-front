import { KardexProductModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const kardexProductSlice = createSlice({
  name: 'kardexProduct',
  initialState: {
    kardexProducts: [] as KardexProductModel[],
  },
  reducers: {
    setKardexProduct: (state, action) => {
      state.kardexProducts = action.payload.kardexProducts;
    },
    setAddKardexProduct: (state, action) => {
      state.kardexProducts = [...state.kardexProducts, action.payload.kardexProduct];
    },
  }
});

export const {
  setKardexProduct,
  setAddKardexProduct,
} = kardexProductSlice.actions;