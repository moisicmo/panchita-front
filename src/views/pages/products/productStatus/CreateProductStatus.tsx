import { ComponentInput, MaterialUISwitch } from "@/components"
import { useForm, useProductStatusStore } from "@/hooks";
import { FormProductStatusModel, FormProductStatusValidations, ProductStatusModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from "@mui/material"
import { FormEvent, useState } from "react";

interface createProps {
  productId: string;
  open: boolean;
  handleClose: () => void;
  item: ProductStatusModel | null;
}

const formFields: FormProductStatusModel = {
  name: '',
  price: 0,
  discount: 0,
  typeDiscount: 'Monto',
}

const formValidations: FormProductStatusValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  price: [(value: number) => value != 0, 'Debe ingresar el nombre'],
}

export const CreateProductStatus = (props: createProps) => {
  const {
    productId,
    open,
    handleClose,
    item,
  } = props;
  const { postCrateProductStatus, putUpdateProductStatus } = useProductStatusStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name, price, discount, typeDiscount,
    onInputChange, isFormValid, onResetForm, onValueChange,
    nameValid, priceValid,
  } = useForm(item ?? formFields, formValidations);


  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log('hi')
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCrateProductStatus(
        {
          productId,
          name: name.trim(),
          price: price,
          discount: discount,
          typeDiscount,
        });
    } else {
      putUpdateProductStatus(item.id,
        {
          productId,
          name: name.trim(),
          price: price,
          discount: discount,
          typeDiscount,
        }
      );
    }
    handleClose();
    onResetForm();
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Estado' : `${item.name}`}</DialogTitle>
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
                  label="Precio"
                  name="price"
                  value={price}
                  onChange={onInputChange}
                  error={!!priceValid && formSubmitted}
                  helperText={formSubmitted ? priceValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Descuento"
                  name="discount"
                  value={discount}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <Stack direction="row" alignItems="center" justifyContent="center">
                  <Typography>Monto</Typography>
                  <MaterialUISwitch
                    onChange={(event) => {
                      if (event.target.checked) {
                        onValueChange('typeDiscount', 'Porcentaje')
                      } else {
                        onValueChange('typeDiscount', 'Monto')
                      }
                    }}
                  />
                  <Typography>Porcentaje</Typography>
                </Stack>
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
