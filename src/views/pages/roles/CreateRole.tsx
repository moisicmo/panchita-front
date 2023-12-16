import { ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useForm, useRoleStore } from "@/hooks";
import { FormRoleModel, FormRoleValidations, PermissionModel, RoleModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { PermissionTable } from "../permisions";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: RoleModel | null;
}

const formFields: FormRoleModel = {
  name: '',
  permissionIds: [],
}

const formValidations: FormRoleValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  permissionIds: [(value: PermissionModel[]) => value.length >= 1, 'Debe ingresar un permiso'],
}


export const CreateRole = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { name, permissionIds, onInputChange, isFormValid, onValueChange, nameValid, permissionIdsValid, onResetForm } = useForm(item ?? formFields, formValidations);
  const { postCreateRole, putUpdateRole } = useRoleStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const handleModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateRole(
        {
          businessId: 1,
          name: name.trim(),
          permissionIds: permissionIds.map((e: PermissionModel) => e.id)
        });
    } else {
      putUpdateRole(item.id,
        {
          businessId: 1,
          name: name.trim(),
          permissionIds: permissionIds.map((e: PermissionModel) => e.id)
        });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      {
        modal &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title='Permisos:'
          opendrawer={modal}
          handleDrawer={handleModal}
        >
          <PermissionTable
            stateSelect={true}
            itemSelect={(v) => {
              if (permissionIds.map((e: PermissionModel) => e.id).includes(v.id)) {
                onValueChange('permissionIds', [...permissionIds.filter((e: PermissionModel) => e.id != v.id)])
              } else {
                onValueChange('permissionIds', [...permissionIds, v])
              }
            }}
            items={permissionIds.map((e: PermissionModel) => (e.id))}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Rol' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
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
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={permissionIds != null ? '' : 'Permisos'}
                  title={'Permisos'}
                  onPressed={() => handleModal(true)}
                  error={!!permissionIdsValid && formSubmitted}
                  helperText={formSubmitted ? permissionIdsValid : ''}
                  items={permissionIds.map((e: PermissionModel) => ({ id: e.id, name: e.name }))}
                  onRemove={(v) => onValueChange('permissionIds', [...permissionIds.filter((e: PermissionModel) => e.id != v)])}
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
