import { ComponentInput } from "@/components"
import { useForm, useUnitMeasurementStore } from "@/hooks";
import { FormUnitMeasurementModel, FormUnitMeasurementValidations, UnitMeasurementModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FormEvent, useState } from "react";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: UnitMeasurementModel | null;
}

const formFields: FormUnitMeasurementModel = {
  name: ''
}

const formValidations: FormUnitMeasurementValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
}


export const CreateUnitMeasurement = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCreateUnitMeasurement, putUpdateUnitMeasurement } = useUnitMeasurementStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { name, onInputChange, isFormValid, nameValid, onResetForm } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateUnitMeasurement({ name: name.trim() });
    } else {
      putUpdateUnitMeasurement(item.id, { name: name.trim() });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>{item == null ? 'Nueva unidad de medida' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <ComponentInput
              type="text"
              label="Nombre"
              name="name"
              value={name}
              onChange={onInputChange}
              error={!!nameValid && formSubmitted}
              helperText={formSubmitted ? nameValid : ''}
            />
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
