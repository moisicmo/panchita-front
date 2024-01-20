import { ComponentSelectPicker } from "@/components";
import { useBranchOfficeStore, useForm, useKardexProductStore, useOrderStore, useProductStore } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { CartView, DetailSale, SearchProduct } from ".";
import { BranchOfficeModel, CustomerModel, FormOderModel, FormOrderValidations, OrderModel, OutputModel } from "@/models";
interface createProps {
  open: boolean;
  handleClose: () => void;
  item: OrderModel | null;
}
const formFields: FormOderModel = {
  branchOfficeId: null,
  customerId: null,
  outputIds: []
}

const formValidations: FormOrderValidations = {
  branchOfficeId: [(value: BranchOfficeModel) => value != null, 'Debe ingresar la sucursal'],
  customerId: [(value: CustomerModel) => value != null, 'Debe seleccionar al cliente'],
}


export const CreateOrder = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const {
    branchOfficeId, customerId, outputIds,
    isFormValid, onValueChange,
    branchOfficeIdValid, customerIdValid, outputIdsValid,
  } = useForm(item ?? formFields, formValidations);

  const { getProducts } = useProductStore();
  const { branchOffices = [], getBranchOffices } = useBranchOfficeStore();
  const { getAllKardexProducts } = useKardexProductStore();
  const { postCreateOrder, putUpdateOrder } = useOrderStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    getBranchOffices();
    getProducts();
    getAllKardexProducts();
  }, []);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await postCreateOrder({
        branchOfficeId: branchOfficeId.id,
        customerId: customerId.id,
        paymentMethodId: 1,
        outputs: [...outputIds.map((output: OutputModel) => {
          return {
            ...output,
            productId: output.product.id
          }
        })],
      });
    } else {
      await putUpdateOrder(item.id, { branchOfficeId: branchOfficeId.id, customerId, outputIds });
    }
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" >
      <DialogTitle>{item == null ? 'Nueva Orden' : `Orden ${item.id}`}</DialogTitle>
      <form onSubmit={sendSubmit}>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} sm={branchOfficeId != null ? 5 : 12} sx={{ padding: '5px' }}>
              <ComponentSelectPicker
                title='Sucursales'
                value={branchOfficeId == null ? '' : branchOfficeId.id}
                onChange={(value: string) => {
                  onValueChange('branchOfficeId', branchOffices.find((e: BranchOfficeModel) => e.id == value) as BranchOfficeModel);
                }}
                options={branchOffices.map((e: BranchOfficeModel) => ({ id: e.id, name: e.name }))}
                error={!!branchOfficeIdValid && formSubmitted}
                helperText={formSubmitted ? branchOfficeIdValid : ''}
              />
              {
                branchOfficeId &&
                <SearchProduct
                  outputIds={outputIds}
                  pushItem={(item) => onValueChange('outputIds', [...outputIds, item])}
                  branchOfficeId={branchOfficeId}
                />
              }
            </Grid>
            {
              branchOfficeId != null &&
              <Grid item xs={12} sm={7} sx={{ padding: '5px' }}>
                <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                  <CartView
                    outputIds={outputIds}
                    subtractItem={(item) =>
                      onValueChange('outputIds', [...outputIds.map((output: any) => {
                        if (item.product.id == output.product.id) {
                          return { ...item }
                        }
                        return output;
                      })])
                    }
                    addItem={(item) =>
                      onValueChange('outputIds', [...outputIds.map((output: any) => {
                        if (item.product.id == output.product.id) {
                          return { ...item }
                        }
                        return output;
                      })])
                    }
                    removeItem={(item) => onValueChange('outputIds', [...outputIds.filter((output: any) => output.product.id != item.product.id)])}
                    error={!!outputIdsValid && formSubmitted}
                    helperText={formSubmitted ? outputIdsValid : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                  <DetailSale
                    outputIds={outputIds}
                    value={customerId as CustomerModel}
                    onChange={(value: string) => onValueChange('customerId', value)}
                    error={!!customerIdValid && formSubmitted}
                    helperText={formSubmitted ? customerIdValid : ''}
                  />
                </Grid>
              </Grid>
            }
          </Grid >
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            // onResetForm();
            handleClose()
          }}>Cancelar</Button>
          <Button type="submit">
            {item == null ? 'CREAR' : 'EDITAR'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
