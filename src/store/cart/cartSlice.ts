import { BranchOfficeModel, CustomerModel, OutputModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [] as OutputModel[],
    branchOffice: null as BranchOfficeModel | null,
    customer: null as CustomerModel | null,
  },
  reducers: {

    setClearAllCart: (state, /*{payload}*/) => {
      state.cart = [];
      state.branchOffice = null;
      state.customer = null;
    },
    setCustomerCart: (state, { payload }) => {
      state.customer = payload.customer;
    },
    setClearCart: (state, /*{payload}*/) => {
      state.cart = [];
    },
    setAddCart: (state, { payload }) => {
      //definimos la sucursal que sera el carrito
      if (payload.newBranchOffice) state.branchOffice = payload.newBranchOffice;
      const item = state.cart.find((item:OutputModel)=> item.product.id == payload.itemCart.product.id);
      
      if(item){
        state.cart = [...state.cart.map((e)=>{
          if (e.product.id === payload.itemCart.product.id && e.product.branchOfficeId === payload.itemCart.product.branchOfficeId) {
            if (e.quantity < e.product.stock) {
              return {
                ...e,
                quantity: e.quantity + 1,
              };
            }
          }
          return e;
        })]
      }else{
        state.cart = [...state.cart,payload.itemCart]
      }
    },
    setRemoveCart: (state, { payload }) => {
      state.cart = [...state.cart.map((e)=>{
        if(e.product.id === payload.itemCart.product.id && e.product.branchOfficeId === payload.itemCart.product.branchOfficeId){
          if(e.quantity > 1){
            return {
              ...e,
              quantity: e.quantity - 1
            } 
          } else {
            return null;
          }
        }
        return e;
      }).filter((e) => e !== null) as OutputModel[]];
      if (state.cart.length == 0) {
        state.branchOffice = null;
      }
    },

  }
});

// Action creators are generated for each case reducer function
export const {
  setClearAllCart,
  setClearCart,
  setAddCart,
  setRemoveCart,
  setCustomerCart,
} = cartSlice.actions;