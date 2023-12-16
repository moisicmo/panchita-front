import { PermissionModel } from ".";

/* WAREHOUSE MODEL */
export interface RoleModel {
  id: number;
  name: string;
  permissionIds: PermissionModel[];
}

/* FORM CUSTOMER MODEL */
export interface FormRoleModel {
  name: string;
  permissionIds: PermissionModel[];
}

/*FORM CUSTOMER MODEL VALIDATIONS */
export interface FormRoleValidations {
  name: [(value: string) => boolean, string];
  permissionIds: [(value: PermissionModel[]) => boolean, string];
}