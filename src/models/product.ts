import { CategoryModel, UnitMeasurementModel } from ".";

/* PRODUCT MODEL */
export interface ProductModel {
    id: string;
    categoryId: CategoryModel;
    measurementUnitId: UnitMeasurementModel;
    code: string;
    name: string;
    image: string | null;
    barCode: string | null;
    visible: boolean;
    price: number;
}
/* FORM PRODUCT MODEL */
export interface FormProductModel {
    name: string;
    price: number;
    discount: number;
    typeDiscount: string;
    categoryId: CategoryModel | null;
    measurementUnitId: UnitMeasurementModel | null;
}

/*FORM PRODUCT VALIDATIONS */
export interface FormProductValidations {
    name: [(value: string) => boolean, string];
    price: [(value: number) => boolean, string];
    categoryId: [(value: CategoryModel) => boolean, string];
    measurementUnitId: [(value: UnitMeasurementModel) => boolean, string];
}