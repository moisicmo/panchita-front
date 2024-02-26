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
    categoryId: CategoryModel | null;
    measurementUnitId: MeasurementUnitModel | null;
}

/*FORM PRODUCT VALIDATIONS */
export interface FormProductValidations {
    name: [(value: string) => boolean, string];
    price: [(value: number) => boolean, string];
    categoryId: [(value: CategoryModel) => boolean, string];
    measurementUnitId: [(value: MeasurementUnitModel) => boolean, string];
}