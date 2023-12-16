/* CATEGORY MODEL */
export interface CategoryModel {
    id: string;
    name: string;
    state: boolean;
}

/* FORM CATEGORY MODEL */
export interface FormCategoryModel {
    name: string;
}

/*FORM CATEGORY VALIDATIONS */
export interface FormCategoryValidations {
    name: [(value: string) => boolean, string];
}