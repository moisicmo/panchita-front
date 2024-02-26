import { KardexBranchOfficeModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const kardexProductSlice = createSlice({
  name: 'kardexProduct',
  initialState: {
    kardexProducts: [] as KardexBranchOfficeModel[],
    kardexProductsSale: [] as KardexBranchOfficeModel[],
  },
  reducers: {
    setKardexProduct: (state, action) => {
      state.kardexProducts = action.payload.kardexProducts;
    },
    setKardexProductSale: (state, action) => {
      state.kardexProductsSale = action.payload.kardexProductsSale;
    },
    setAddKardexProduct: (state, action) => {
      console.log('AGREGANDO');
      const newKardex: KardexBranchOfficeModel = action.payload.kardexProduct;
    
      // Buscar la sucursal existente
      const existingBranchOffice = state.kardexProducts.find(
        (kardexList) => kardexList.branchOffice.id === newKardex.branchOffice.id
      );
    
      if (existingBranchOffice) {
        // Buscar productos coincidentes en la sucursal existente
        const matchingProducts = existingBranchOffice.branchOffice.products.filter((product) =>
          newKardex.branchOffice.products.some((e) => e.id === product.id)
        );
    
        if (matchingProducts.length > 0) {
          // Agregar al producto (aquí deberías tener la lógica para agregar a un producto específico)
          state.kardexProducts = state.kardexProducts.map((kardexList) => {
            if (kardexList.branchOffice.id === newKardex.branchOffice.id) {
              return {
                ...kardexList,
                branchOffice: {
                  ...kardexList.branchOffice,
                  products: kardexList.branchOffice.products.map((product) => {
                    const matchingProduct = newKardex.branchOffice.products.find((e) => e.id === product.id);
        
                    if (matchingProduct) {
                      return {
                        ...product,
                        stock: product.stock + matchingProduct.stock,
                        kardex: [
                          ...product.kardex,
                          ...matchingProduct.kardex,
                        ],
                      };
                    }
                    return product;
                  }),
                },
              };
            }
            return kardexList;
          });
        } else {
          // Agregar nuevos productos al array existente
          state.kardexProducts = state.kardexProducts.map((kardexList) => {
            if (kardexList.branchOffice.id === newKardex.branchOffice.id) {
              return {
                ...kardexList,
                branchOffice: {
                  ...kardexList.branchOffice,
                  products: [...kardexList.branchOffice.products, ...newKardex.branchOffice.products],
                },
              };
            }
            return kardexList;
          });
        }
      } else {
        // Agregar una nueva entrada si la sucursal no existe
        state.kardexProducts = [...state.kardexProducts, { branchOffice: newKardex.branchOffice }];
      }
    },
     
  }
});

export const {
  setKardexProduct,
  setKardexProductSale,
  setAddKardexProduct,
} = kardexProductSlice.actions;