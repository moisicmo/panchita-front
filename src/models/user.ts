import { TypeDocumentModel } from ".";

/* USER MODEL */
export interface UserModel {
  id: string;
  numberDocument: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  typeDocumentId: TypeDocumentModel;
}