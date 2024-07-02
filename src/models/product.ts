import { CategoryModel, MeasurementUnitModel } from ".";

/* PRODUCT MODEL */
export interface ProductModel {
    productId:number;
    branchOfficeId:number;
    id: number;
    category: CategoryModel;
    measurementUnit: MeasurementUnitModel;
    code: string;
    name: string;
    image: string | null;
    barCode: string | null;
    visible: boolean;
    price: number;
    discount: number;
    typeDiscount: string;
    stock: number;
}

/* FORM PRODUCT MODEL */
export interface FormProductModel {
    name: string;
    price: number;
    discount: number;
    typeDiscount: string;
    category: CategoryModel | null;
    measurementUnit: MeasurementUnitModel | null;
}

/*FORM PRODUCT VALIDATIONS */
export interface FormProductValidations {
    name: [(value: string) => boolean, string];
    price: [(value: number) => boolean, string];
    category: [(value: CategoryModel) => boolean, string];
    measurementUnit: [(value: MeasurementUnitModel) => boolean, string];
}