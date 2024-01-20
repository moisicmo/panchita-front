import { ProductModel } from ".";

/* OUTPUT MODEL */
export interface OutputModel {
  id?: number;
  price: number;
  quantity: number;
  discount: number;
  typeDiscount: string;
  product: ProductModel;
}