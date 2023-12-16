/* UNIT MEASUREMENT MODEL */
export interface UnitMeasurementModel {
    id: string;
    name: string;
    state: boolean;
}

/* FORM UNIT MEASUREMENT MODEL */
export interface FormUnitMeasurementModel {
    name: string;
}

/*FORM UNIT MEASUREMENT VALIDATIONS */
export interface FormUnitMeasurementValidations {
    name: [(value: string) => boolean, string];
}