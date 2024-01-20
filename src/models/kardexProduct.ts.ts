import { BranchOfficeModel, ProductModel } from ".";

/* KARDEX PRODUCT MODEL */
export interface KardexProductModel {
  id: number;
  inputOrOutputType: string;
  detail: string;
  stock: number;
  product: ProductModel;
  branchOffice: BranchOfficeModel;
  input: {
    id: number;
    quantity: number;
    price: number;
    dueDate: any;
    createdAt: Date;
  },
  output: {
    id: number;
    quantity: number;
    price: number;
    createdAt: Date;
  },
}

/* FORM INPUT PRODUCT MODEL */
export interface FormInputProductModel {
  branchOfficeId: BranchOfficeModel | null;
  productId: ProductModel | null;
  detail: string;
  quantity: number;
  price: number;
}

/*FORM INPUT PRODUCT VALIDATIONS */
export interface FormInputProductValidations {
  branchOfficeId: [(value: BranchOfficeModel) => boolean, string];
  productId: [(value: ProductModel) => boolean, string];
  detail: [(value: string) => boolean, string];
  quantity: [(value: number) => boolean, string];
  price: [(value: number) => boolean, string];
}