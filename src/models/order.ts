import { BranchOfficeModel, CustomerModel, OutputModel, } from ".";


/* ORDER MODEL */
export interface OrderModel {
  id: string;
  customerId: CustomerModel;
  warehouseId: BranchOfficeModel;
  outputIds: OutputModel[];
  total: number;
  discount: number;
  typeDiscount: string;
  createdAt: Date;
}


/* FORM ORDER MODEL */
export interface FormOderModel {
  warehouseId: BranchOfficeModel | null;
  customerId: CustomerModel | null;
  outputIds: OutputModel[]
  // cartProduct: CartModel[]
}

/*FORM ORDER VALIDATIONS */
export interface FormOrderValidations {
  warehouseId: [(value: BranchOfficeModel) => boolean, string];
  customerId: [(value: CustomerModel) => boolean, string];
  // cartProduct: [(value: CartModel[]) => boolean, string];
}