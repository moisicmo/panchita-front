import { BranchOfficeModel, ProductModel } from ".";

/* KARDEX PRODUCT MODEL */
export interface KardexModel {
  id:number,
  inputOrOutputType:string,
  detail:string,
  output:{
    id:number,
    orderId:number,
    quantity:number,
    price:number,
    discount:number,
    typeDiscount:string,
    state:boolean,
    createdAt:Date,
    // product: ProductModel;
  },
  input:{
    id:number,
    quantity:number,
    price:number,
    dueDate:Date|null,
    createdAt:Date,
  }
}

export interface KardexProductModel {
  id:number,
  code:string,
  name:string,
  image:string|null,
  barCode:string,
  visible:boolean,
  stock:number,
  kardex:KardexModel[]
}

export interface KardexBranchOfficeModel {
  branchOffice:{
    id:number,
    name:string,
    address:string,
    phone:string,
    products:KardexProductModel[]
  }
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