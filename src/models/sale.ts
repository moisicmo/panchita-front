import { BranchOfficeModel, CustomerModel, OutputModel, PaymentMethodModel } from ".";

/* SALE MODEL */
export interface SaleModel {
  id: number;
  customer: CustomerModel;
  paymentMethod: PaymentMethodModel;
  branchOffice: BranchOfficeModel;
  outputIds: OutputModel[];
  amount: number;
  createdAt: Date;
}