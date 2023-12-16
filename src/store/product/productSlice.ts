import { createSlice } from '@reduxjs/toolkit';
import { ProductModel } from '../../models';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [] as ProductModel[],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products;
        },
        setAddProduct: (state, action) => {
            state.products = [...state.products, action.payload.product];
        },
        setUpdateProduct: (state, action) => {
            state.products = [...state.products.map((e) => {
                if (e.id === action.payload.product.id) {
                    return {
                        ...action.payload.product
                    }
                }
                return e
            })];
        },
        setDeleteProduct: (state, action) => {
            state.products = [...state.products.filter(e => e.id != action.payload.id)];
        },
        // PRODUCT STATUS
        setAddProductStatus: (state, action) => {
            state.products = [...state.products.map((e) => {
                if (e.id === action.payload.product.id) {
                    return {
                        ...action.payload.product
                    }
                }
                return e
            })];
        },
        setUpdateProductStatus: (state, action) => {
            state.products = [...state.products.map((e) => {
                if (e.id === action.payload.product.id) {
                    return {
                        ...action.payload.product
                    }
                }
                return e
            })];
        },
        setDeleteProductStatus: (state, action) => {
            state.products = [...state.products.map((e) => {
                if (e.id === action.payload.product.id) {
                    return {
                        ...action.payload.product
                    }
                }
                return e
            })];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    setProducts,
    setAddProduct,
    setUpdateProduct,
    setDeleteProduct,
    // 
    setAddProductStatus,
    setUpdateProductStatus,
    setDeleteProductStatus,
} = productSlice.actions;