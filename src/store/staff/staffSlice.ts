import { createSlice } from '@reduxjs/toolkit';
import { StaffModel } from '../../models';

export const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    staffs: [] as StaffModel[],
  },
  reducers: {
    setstaffs: (state, action) => {
      state.staffs = action.payload.staffs;
    },
    setAddstaff: (state, action) => {
      state.staffs = [...state.staffs, action.payload.staff];
    },
    setUpdatestaff: (state, action) => {
      state.staffs = [...state.staffs.map((e) => {
        if (e.id === action.payload.staff.id) {
          return {
            ...action.payload.staff
          }
        }
        return e
      })];
    },
    setDeletestaff: (state, action) => {
      state.staffs = [...state.staffs.filter(e => e.id != action.payload.id)];
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  setstaffs,
  setAddstaff,
  setUpdatestaff,
  setDeletestaff,
} = staffSlice.actions;