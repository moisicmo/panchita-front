import { BranchOfficeModel, ProductModel } from ".";

/* OUTPUT MODEL */
export interface OutputModel {
  id?: string;
  price: number;
  warehouseId: BranchOfficeModel,
  quantity: number;
  discount: number;
  typeDiscount: string;
  productStatusId: ProductModel;
}
// export interface OutputModel {
//   id: string;
//   productStatusId: ProductStatusModel;
//   quantity: number;
//   price: number;
//   discount: number;
//   typeDiscount: string;
//   createdAt: Date;
// }