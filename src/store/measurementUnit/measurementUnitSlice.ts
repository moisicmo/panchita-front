import { createSlice } from '@reduxjs/toolkit';
import { MeasurementUnitModel } from '../../models';

export const measurementUnitSlice = createSlice({
  name: 'measurementUnit',
  initialState: {
    measurementUnits: [] as MeasurementUnitModel[],
  },
  reducers: {
    setMeasurementUnits: (state, action) => {
      state.measurementUnits = action.payload.measurementUnits;
    },
    setAddMeasurementUnit: (state, action) => {
      state.measurementUnits = [...state.measurementUnits, action.payload.measurementUnit];
    },
    setUpdateMeasurementUnit: (state, action) => {
      state.measurementUnits = [...state.measurementUnits.map((e) => {
        if (e.id === action.payload.measurementUnit.id) {
          return {
            ...action.payload.measurementUnit
          }
        }
        return e
      })];
    },
    setDeleteMeasurementUnit: (state, action) => {
      state.measurementUnits = [...state.measurementUnits.filter(e => e.id != action.payload.id)];
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  setMeasurementUnits,
  setAddMeasurementUnit,
  setUpdateMeasurementUnit,
  setDeleteMeasurementUnit,
} = measurementUnitSlice.actions;