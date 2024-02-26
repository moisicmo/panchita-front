import { ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useCustomerStore, useForm } from "@/hooks";
import { FormCustomerModel, FormCustomerValidations, TypeDocumentModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { TypeDocumentTable } from "../typeDocuments";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: any;
}

const formFields: FormCustomerModel = {
  name: '',
  lastName: '',
  email: '',
  phone: 0,
  typeDocumentId: null,
  numberDocument: 0,
}

const formValidations: FormCustomerValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value: string) => value.length >= 1, 'Debe ingresar el apellido'],
  email: [(value: string) => value.length >= 1, 'Debe ingresar el correo'],
  phone: [(value: number) => value != 0, 'Debe ingresar el telefono'],
  typeDocumentId: [(value: TypeDocumentModel) => value != null, 'Debe ingresar el nombre'],
  numberDocument: [(value: number) => value != 0, 'Debe ingresar el nombre'],
}

export const CreateCustomer = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCreateCustomer, putUpdateCustomer } = useCustomerStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name, lastName, email, phone, typeDocumentId, numberDocument,
    onInputChange, isFormValid, onResetForm, onValueChange,
    nameValid, lastNameValid, emailValid, phoneValid, typeDocumentIdValid, numberDocumentValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateCustomer(
        {
          name: name.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone,
          typeDocumentId: typeDocumentId.id,
          numberDocument: numberDocument
        });
    } else {
      putUpdateCustomer(item.id,
        {
          name: name.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone,
          typeDocumentId: typeDocumentId.id,
          numberDocument: numberDocument
        });
    }
    handleClose();
    onResetForm();
  }
  const [modal, setModal] = useState(false);
  const handleModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);
  return (
    <>
      {
        modal &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Tipo de documento:'
          opendrawer={modal}
          handleDrawer={handleModal}
          zIndex={10000}
        >
          <TypeDocumentTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (typeDocumentId == null || typeDocumentId.id != v.id) {
                onValueChange('typeDocumentId', v)
                handleModal(false)
              }
            }}
            items={typeDocumentId == null ? [] : [typeDocumentId.id]}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} sx={{zIndex:9999}} >
        <DialogTitle>{item == null ? 'Nuevo cliente' : `${item.user.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
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
                  label="Apellido"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  error={!!lastNameValid && formSubmitted}
                  helperText={formSubmitted ? lastNameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
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
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
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
                  label={typeDocumentId != null ? 'Tipo de documento' : ''}
                  title={typeDocumentId != null ? typeDocumentId.name : 'Tipo de documento'}
                  onPressed={() => handleModal(true)}
                  error={!!typeDocumentIdValid && formSubmitted}
                  helperText={formSubmitted ? typeDocumentIdValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Numero de documento"
                  name="numberDocument"
                  value={numberDocument}
                  onChange={onInputChange}
                  error={!!numberDocumentValid && formSubmitted}
                  helperText={formSubmitted ? numberDocumentValid : ''}
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
