import { TypeDocumentModel, UserModel } from ".";

/* CUSTOMER MODEL */
export interface CustomerModel {
    id: string;
    user: UserModel
}

/* FORM CUSTOMER MODEL */
export interface FormCustomerModel {
    name: string;
    lastName: string;
    email: string;
    phone: number;
    typeDocumentId: TypeDocumentModel | null;
    numberDocument: number;
}

/*FORM CUSTOMER VALIDATIONS */
export interface FormCustomerValidations {
    name: [(value: string) => boolean, string];
    lastName: [(value: string) => boolean, string];
    email: [(value: string) => boolean, string];
    phone: [(value: number) => boolean, string];
    typeDocumentId: [(value: TypeDocumentModel) => boolean, string];
    numberDocument: [(value: number) => boolean, string];
}