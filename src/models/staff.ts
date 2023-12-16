import { BranchOfficeModel, RoleModel, TypeDocumentModel, UserModel } from ".";

/* STAFF MODEL */
export interface StaffModel {
  id: string;
  user: UserModel;
  roleId: RoleModel;
  branchOfficeIds: BranchOfficeModel[];
}

/* FORM USER MODEL */
export interface FormStaffModel {
  typeDocumentId: TypeDocumentModel | null,
  identityCard: string,
  name: string;
  lastName: string;
  email: string;
  phone: string;
  roleId: RoleModel | null;
  branchOfficeIds: BranchOfficeModel[];
}

/*FORM USER VALIDATIONS */
export interface FormStaffValidations {
  typeDocumentId: [(value: TypeDocumentModel) => boolean, string];
  identityCard: [(value: string) => boolean, string];
  name: [(value: string) => boolean, string];
  lastName: [(value: string) => boolean, string];
  email: [(value: string) => boolean, string];
  phone: [(value: string) => boolean, string];
  roleId: [(value: RoleModel) => boolean, string];
  branchOfficeIds: [(value: BranchOfficeModel[]) => boolean, string];
}