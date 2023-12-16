import { ComponentInput } from "@/components"
import { useBranchOfficeStore, useForm } from "@/hooks";
import { BranchOfficeModel, FormBranchOfficeModel, FormBranchOfficeValidations } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useState } from "react";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: BranchOfficeModel | null;
}

const formFields: FormBranchOfficeModel = {
  typeBranchOffice: '',
  name: '',
  address: '',
  phone: 0
}

const formValidations: FormBranchOfficeValidations = {
  typeBranchOffice: [(value: string) => value.length >= 1, 'Debe ingresar el tipo'],
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  address: [(value: string) => value.length >= 1, 'Debe ingresar la direcciön'],
  phone: [(value: number) => value != 0, 'Debe ingresar el nombre'],
}

export const CreateBranchOffice = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCreateBranchOffice, putUpdateBranchOffice } = useBranchOfficeStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    typeBranchOffice, name, address, phone,
    onInputChange, isFormValid,
    typeBranchOfficeValid, nameValid, addressValid, phoneValid, onResetForm } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateBranchOffice(
        {
          businessId: 1,
          typeBranchOffice: typeBranchOffice.trim(),
          name: name.trim(),
          address: address.trim(),
          phone: phone,
        });
    } else {
      putUpdateBranchOffice(item.id,
        {
          businessId: 1,
          typeBranchOffice: typeBranchOffice.trim(),
          name: name.trim(),
          address: address.trim(),
          phone: phone,
        });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nueva Sucursal' : `Sucursal: ${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Tipo de sucursal"
                  name="typeBranchOffice"
                  value={typeBranchOffice}
                  onChange={onInputChange}
                  error={!!typeBranchOfficeValid && formSubmitted}
                  helperText={formSubmitted ? typeBranchOfficeValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
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
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Dirección"
                  name="address"
                  value={address}
                  onChange={onInputChange}
                  error={!!addressValid && formSubmitted}
                  helperText={formSubmitted ? addressValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Telefono"
                  name="phone"
                  value={phone}
                  onChange={onInputChange}
                  error={!!phoneValid && formSubmitted}
                  helperText={formSubmitted ? phoneValid : ''}
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
