import { ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useForm, useStaffStore } from "@/hooks";
import { BranchOfficeModel, FormStaffModel, FormStaffValidations, RoleModel, TypeDocumentModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { BranchOfficeTable } from "../branchOffices";
import { RoleTable } from "../roles";
import { TypeDocumentTable } from "../typeDocuments";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: any;
}

const formFields: FormStaffModel = {
  typeDocumentId: null,
  numberDocument: '',
  name: '',
  lastName: '',
  email: '',
  phone: '',
  roleId: null,
  branchOfficeIds: [],
}

const formValidations: FormStaffValidations = {
  typeDocumentId: [(value: TypeDocumentModel) => value != null, 'Debe ingresar el tipo de documento'],
  numberDocument: [(value: string) => value.length >= 1, 'Debe ingresar el numero de documento'],
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  email: [(value: string) => value.length >= 1, 'Debe ingresar el correo'],
  phone: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  roleId: [(value: RoleModel) => value != null, 'Debe ingresar el nombre'],
  branchOfficeIds: [(value: BranchOfficeModel[]) => value.length >= 1, 'Debe ingresar el nombre'],
}
export const CreateUser = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCreateStaff, putUpdateStaff } = useStaffStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    typeDocumentId, numberDocument, name, lastName, email, phone, roleId, branchOfficeIds,
    onInputChange, isFormValid, onResetForm, onValueChange,
    typeDocumentIdValid, numberDocumentValid, nameValid, lastNameValid, emailValid, phoneValid, roleIdValid, branchOfficeIdsValid,
  } = useForm(item == null ? formFields : item, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateStaff(
        {
          typeDocumentId: typeDocumentId.id,
          numberDocument: numberDocument.trim(),
          name: name.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone,
          roleId: roleId.id,
          branchOfficeIds: branchOfficeIds.map((e: BranchOfficeModel) => e.id)
        });
    } else {
      putUpdateStaff(item.id,
        {
          typeDocumentId: typeDocumentId.id,
          numberDocument: numberDocument.trim(),
          name: name.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone,
          roleId: roleId.id,
          branchOfficeIds: branchOfficeIds.map((e: BranchOfficeModel) => e.id)
        });
    }
    handleClose();
    onResetForm();
  }

  const [modalRole, setModalRole] = useState(false);
  const [modalWarehouse, setModalWarehouse] = useState(false);
  const [modalTypeDocument, setModalTypeDocument] = useState(false);
  const handleModalRole = useCallback((value: boolean) => {
    setModalRole(value);
  }, []);

  const handleModalWarehouse = useCallback((value: boolean) => {
    setModalWarehouse(value);
  }, []);
  const handleModalTypeDocument = useCallback((value: boolean) => {
    setModalTypeDocument(value);
  }, []);
  return (
    <>
      {
        modalTypeDocument &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Tipo de documento:'
          opendrawer={modalTypeDocument}
          handleDrawer={handleModalTypeDocument}
        >
          <TypeDocumentTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (typeDocumentId == null || typeDocumentId.id != v.id) {
                onValueChange('typeDocumentId', v)
                handleModalTypeDocument(false)
              }
            }}
            items={typeDocumentId == null ? [] : [typeDocumentId.id]}
          />
        </ModalSelectComponent>
      }
      {
        modalRole &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Roles:'
          opendrawer={modalRole}
          handleDrawer={handleModalRole}
        >
          <RoleTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (roleId == null || roleId.id != v.id) {
                onValueChange('roleId', v)
                handleModalRole(false)
              }
            }}
            items={roleId == null ? [] : [roleId.id]}
          />
        </ModalSelectComponent>
      }
      {
        modalWarehouse &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title='Sucursales:'
          opendrawer={modalWarehouse}
          handleDrawer={handleModalWarehouse}
        >
          <BranchOfficeTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (branchOfficeIds.map((e: BranchOfficeModel) => e.id).includes(v.id)) {
                onValueChange('branchOfficeIds', [...branchOfficeIds.filter((e: BranchOfficeModel) => e.id != v.id)])
              } else {
                onValueChange('branchOfficeIds', [...branchOfficeIds, v])
              }
            }}
            items={branchOfficeIds.map((e: BranchOfficeModel) => (e.id))}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Administrador' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={typeDocumentId != null ? 'Tipo de documento' : ''}
                  title={typeDocumentId != null ? typeDocumentId.name : 'Tipo de documento'}
                  onPressed={() => handleModalTypeDocument(true)}
                  error={!!typeDocumentIdValid && formSubmitted}
                  helperText={formSubmitted ? typeDocumentIdValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Número de carnet"
                  name="numberDocument"
                  value={numberDocument}
                  onChange={onInputChange}
                  error={!!numberDocumentValid && formSubmitted}
                  helperText={formSubmitted ? numberDocumentValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Nombre"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  error={!!nameValid && formSubmitted}
                  helperText={formSubmitted ? nameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Apellido"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  error={!!lastNameValid && formSubmitted}
                  helperText={formSubmitted ? lastNameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="email"
                  label="Correo"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid && formSubmitted}
                  helperText={formSubmitted ? emailValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Teléfono"
                  name="phone"
                  value={phone}
                  onChange={onInputChange}
                  error={!!phoneValid && formSubmitted}
                  helperText={formSubmitted ? phoneValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={roleId != null ? 'Rol' : ''}
                  title={roleId != null ? roleId.name : 'Rol'}
                  onPressed={() => handleModalRole(true)}
                  error={!!roleIdValid && formSubmitted}
                  helperText={formSubmitted ? roleIdValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={branchOfficeIds != null ? '' : 'Sucursales'}
                  title={'Sucursales'}
                  onPressed={() => handleModalWarehouse(true)}
                  error={!!branchOfficeIdsValid && formSubmitted}
                  helperText={formSubmitted ? branchOfficeIdsValid : ''}
                  items={branchOfficeIds.map((e: BranchOfficeModel) => ({ id: e.id, name: e.name }))}
                  onRemove={(v) => onValueChange('branchOfficeIds', [...branchOfficeIds.filter((e: BranchOfficeModel) => e.id != v)])}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              onResetForm();
              handleClose()
            }}>Cancelar</Button>
            <Button type="submit">
              {item == null ? 'CREAR' : 'EDITAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
