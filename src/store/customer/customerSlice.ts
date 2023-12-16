import { createSlice } from '@reduxjs/toolkit';
import { CustomerModel, TypeDocumentModel } from '@/models';

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: [] as CustomerModel[],
        typeDocuments: [] as TypeDocumentModel[],
    },
    reducers: {
        setCustomers: (state, action) => {
            state.customers = action.payload.customers;
        },
        setAddCustomer: (state, action) => {
            state.customers = [...state.customers, action.payload.customer];
        },
        setUpdateCustomer: (state, action) => {
            state.customers = [...state.customers.map((e) => {
                if (e.id === action.payload.customer.id) {
                    return {
                        ...action.payload.customer
                    }
                }
                return e
            })];
        },
        setDeleteCustomer: (state, action) => {
            state.customers = [...state.customers.filter(e => e.id != action.payload.id)];
        },
        //type documents
        setTypeDocuments: (state, action) => {
            state.typeDocuments = action.payload.typeDocuments;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    setCustomers,
    setAddCustomer,
    setUpdateCustomer,
    setDeleteCustomer,
    setTypeDocuments,
} = customerSlice.actions;