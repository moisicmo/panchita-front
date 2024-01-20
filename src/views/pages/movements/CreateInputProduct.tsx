import { ComponentDate, ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useForm, useKardexProductStore } from "@/hooks";
import { BranchOfficeModel, FormInputProductModel, FormInputProductValidations, ProductModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Switch } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { ProductTable } from "../products";
import { BranchOfficeTable } from "../branchOffices";

interface createProps {
  open: boolean;
  handleClose: () => void;
}

const formFields: FormInputProductModel = {
  branchOfficeId: null,
  productId: null,
  detail: '',
  quantity: 0,
  price: 0
}

const formValidations: FormInputProductValidations = {
  branchOfficeId: [(value: BranchOfficeModel) => value != null, 'Debe ingresar el nombre'],
  productId: [(value: ProductModel) => value != null, 'Debe ingresar el nombre'],
  detail: [(value: string) => value.length >= 0, 'Debe ingresar el nombre'],
  quantity: [(value: number) => value != 0, 'Debe ingresar el nombre'],
  price: [(value: number) => value != 0, 'Debe ingresar el nombre'],
}

export const CreateInputProduct = (props: createProps) => {
  const {
    open,
    handleClose,
  } = props;
  const { postCreateInputProduct } = useKardexProductStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    branchOfficeId, productId, detail, quantity, price,
    onInputChange, isFormValid, onResetForm, onValueChange,
    branchOfficeIdValid, productIdValid, detailValid, quantityValid, priceValid,
  } = useForm(formFields, formValidations);


  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    postCreateInputProduct(
      {
        branchOfficeId: branchOfficeId.id,
        productId: productId.id,
        detail,
        quantity,
        price,
        dueDate
      });
    handleClose();
    onResetForm();
  }
  const [modalBranchOffice, setModalBranchOffice] = useState(false);
  const handleModalBranchOffice = useCallback((value: boolean) => {
    setModalBranchOffice(value);
  }, []);
  const [modalProductStatus, setModalProductStatus] = useState(false);
  const handleModalProductStatus = useCallback((value: boolean) => {
    setModalProductStatus(value);
  }, []);

  // 
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [stateDueDate, setStateDueDate] = useState<boolean>(false)
  const handleDueDate = (event: any) => {
    setStateDueDate(event.target.checked)
  };
  const onDateChanged = (event: Date) => {
    setDueDate(event)
  }
  return (
    <>
      {
        modalBranchOffice &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Sucursales:'
          opendrawer={modalBranchOffice}
          handleDrawer={handleModalBranchOffice}
        >
          <BranchOfficeTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (branchOfficeId == null || branchOfficeId.id != v.id) {
                onValueChange('branchOfficeId', v)
                handleModalBranchOffice(false)
              }
            }}
            items={branchOfficeId == null ? [] : [branchOfficeId.id]}
          />
        </ModalSelectComponent>
      }
      {
        modalProductStatus &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Productos:'
          opendrawer={modalProductStatus}
          handleDrawer={handleModalProductStatus}
        >
          <ProductTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (productId == null || productId.id != v.id) {
                onValueChange('productId', v)
                handleModalProductStatus(false)
              }
            }}
            items={productId == null ? [] : [productId.id]}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{'Nueva Recepción de Productos'}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={branchOfficeId != null ? 'Sucursal' : ''}
                  title={branchOfficeId != null ? branchOfficeId.name : 'Sucursal'}
                  onPressed={() => handleModalBranchOffice(true)}
                  error={!!branchOfficeIdValid && formSubmitted}
                  helperText={formSubmitted ? branchOfficeIdValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={productId != null ? 'Producto' : ''}
                  title={productId != null ? productId.name : 'Producto'}
                  onPressed={() => handleModalProductStatus(true)}
                  error={!!productIdValid && formSubmitted}
                  helperText={formSubmitted ? productIdValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Cantidad"
                  name="quantity"
                  value={quantity}
                  onChange={onInputChange}
                  error={!!quantityValid && formSubmitted}
                  helperText={formSubmitted ? quantityValid : ''}
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
                  label="Detalle"
                  name="detail"
                  value={detail}
                  onChange={onInputChange}
                  error={!!detailValid && formSubmitted}
                  helperText={formSubmitted ? detailValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <FormControlLabel
                  control={
                    <Switch checked={stateDueDate} onChange={handleDueDate} name="jason" />
                  }
                  label="Fecha de vencimiento"
                />
              </Grid>
              {
                stateDueDate &&
                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                  <ComponentDate
                    value={dueDate}
                    title="Fecha de vencimiento"
                    onChange={(event) => onDateChanged(event)}
                  />
                </Grid>
              }
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              onResetForm();
              handleClose()
            }}>Cancelar</Button>
            <Button type="submit">
              {'CREAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
