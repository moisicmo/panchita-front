/* BRANCH OFFICE MODEL */
export interface BranchOfficeModel {
  id: number;
  typeBranchOffice: string;
  name: string;
  address: string;
  phone: number;
}

/* FORM BRANCH OFFICE MODEL */
export interface FormBranchOfficeModel {
  typeBranchOffice: string;
  name: string;
  address: string;
  phone: number
}

/*FORM BRANCH OFFICE VALIDATIONS */
export interface FormBranchOfficeValidations {
  typeBranchOffice: [(value: string) => boolean, string];
  name: [(value: string) => boolean, string];
  address: [(value: string) => boolean, string];
  phone: [(value: number) => boolean, string];
}