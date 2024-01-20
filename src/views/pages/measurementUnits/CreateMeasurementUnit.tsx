import { ComponentInput } from "@/components"
import { useForm, useMeasurementUnitStore } from "@/hooks";
import { FormMeasurementUnitModel, FormMeasurementUnitValidations, MeasurementUnitModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FormEvent, useState } from "react";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: MeasurementUnitModel | null;
}

const formFields: FormMeasurementUnitModel = {
  name: ''
}

const formValidations: FormMeasurementUnitValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
}


export const CreateMeasurementUnit = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCreateMeasurementUnit, putUpdateMeasurementUnit } = useMeasurementUnitStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { name, onInputChange, isFormValid, nameValid, onResetForm } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateMeasurementUnit({ name: name.trim() });
    } else {
      putUpdateMeasurementUnit(item.id, { name: name.trim() });
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
