import { BranchOfficeModel, CustomerModel, OutputModel, PaymentMethodModel, } from ".";


/* ORDER MODEL */
export interface OrderModel {
  id: number;
  customer: CustomerModel;
  paymentMethod: PaymentMethodModel;
  branchOffice: BranchOfficeModel;
  outputs: OutputModel[];
  amount: number;
  stateSale:boolean;
  state:boolean;
  createdAt: Date;
}


/* FORM ORDER MODEL */
export interface FormOderModel {
  branchOfficeId: BranchOfficeModel | null;
  customerId: CustomerModel | null;
  outputIds: OutputModel[]
  // cartProduct: CartModel[]
}

/*FORM ORDER VALIDATIONS */
export interface FormOrderValidations {
  branchOfficeId: [(value: BranchOfficeModel) => boolean, string];
  customerId: [(value: CustomerModel) => boolean, string];
  // cartProduct: [(value: CartModel[]) => boolean, string];
}