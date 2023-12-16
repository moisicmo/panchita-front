import { createSlice } from '@reduxjs/toolkit';
import { RoleModel } from '../../models';

export const roleSlice = createSlice({
    name: 'warehouse',
    initialState: {
        roles: [] as RoleModel[],
    },
    reducers: {
        setRoles: (state, action) => {
            state.roles = action.payload.roles;
        },
        setAddRole: (state, action) => {
            state.roles = [...state.roles, action.payload.role];
        },
        setUpdateRole: (state, action) => {
            state.roles = [...state.roles.map((e) => {
                if (e.id === action.payload.role.id) {
                    return {
                        ...action.payload.role
                    }
                }
                return e
            })];
        },
        setDeleteRole: (state, action) => {
            state.roles = [...state.roles.filter(e => e.id != action.payload.id)];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    setRoles,
    setAddRole,
    setUpdateRole,
    setDeleteRole,
} = roleSlice.actions;