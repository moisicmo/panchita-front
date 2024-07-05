import { PermissionModel } from ".";

/* WAREHOUSE MODEL */
export interface RoleModel {
  id: number;
  name: string;
  permissions: PermissionModel[];
}

/* FORM CUSTOMER MODEL */
export interface FormRoleModel {
  name: string;
  permissions: PermissionModel[];
}

/*FORM CUSTOMER MODEL VALIDATIONS */
export interface FormRoleValidations {
  name: [(value: string) => boolean, string];
  permissions: [(value: PermissionModel[]) => boolean, string];
}