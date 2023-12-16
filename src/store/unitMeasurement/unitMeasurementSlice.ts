import { createSlice } from '@reduxjs/toolkit';
import { UnitMeasurementModel } from '../../models';

export const unitMeasurementSlice = createSlice({
    name: 'unitMeasurement',
    initialState: {
        unitMeasurements: [] as UnitMeasurementModel[],
    },
    reducers: {
        setUnitMeasurements: (state, action) => {
            state.unitMeasurements = action.payload.measurementUnits;
        },
        setAddUnitMeasurement: (state, action) => {
            state.unitMeasurements = [...state.unitMeasurements, action.payload.unitMeasurement];
        },
        setUpdateUnitMeasurement: (state, action) => {
            state.unitMeasurements = [...state.unitMeasurements.map((e) => {
                if (e.id === action.payload.unitMeasurement.id) {
                    return {
                        ...action.payload.unitMeasurement
                    }
                }
                return e
            })];
        },
        setDeleteUnitMeasurement: (state, action) => {
            state.unitMeasurements = [...state.unitMeasurements.filter(e => e.id != action.payload.id)];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    setUnitMeasurements,
    setAddUnitMeasurement,
    setUpdateUnitMeasurement,
    setDeleteUnitMeasurement,
} = unitMeasurementSlice.actions;