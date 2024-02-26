import { ProductModel } from ".";

/* OUTPUT MODEL */
export interface OutputModel {
  id?: number;
  price: number;
  quantity: number;
  quantityOrigin?: number;
  discount: number;
  typeDiscount: string;
  product: ProductModel;
}