/* UNIT MEASUREMENT MODEL */
export interface MeasurementUnitModel {
    id: string;
    name: string;
    state: boolean;
}

/* FORM UNIT MEASUREMENT MODEL */
export interface FormMeasurementUnitModel {
    name: string;
}

/*FORM UNIT MEASUREMENT VALIDATIONS */
export interface FormMeasurementUnitValidations {
    name: [(value: string) => boolean, string];
}