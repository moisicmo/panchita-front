import { ComponentInput, ComponentSelect, MaterialUISwitch, ModalSelectComponent } from "@/components"
import { useForm, useProductStore } from "@/hooks";
import { CategoryModel, FormProductModel, FormProductValidations, ProductModel, UnitMeasurementModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { CategoryTable } from "../categories";
import { UnitMeasurementTable } from "../unitMeasurements";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: ProductModel | null;
}

const formFields: FormProductModel = {
  name: '',
  price: 0,
  discount: 0,
  typeDiscount: 'Monto',
  categoryId: null,
  measurementUnitId: null,
}

const formValidations: FormProductValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  price: [(value: number) => value != 0, 'Debe ingresar el nombre'],
  categoryId: [(value: CategoryModel) => value != null, 'Debe ingresar el nombre'],
  measurementUnitId: [(value: UnitMeasurementModel) => value != null, 'Debe ingresar el nombre'],
}

export const CreateProduct = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCrateProduct, putUpdateProduct } = useProductStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name, price, discount, typeDiscount, categoryId, measurementUnitId,
    onInputChange, isFormValid, onResetForm, onValueChange,
    nameValid, priceValid, categoryIdValid, measurementUnitIdValid,
  } = useForm(item ?? formFields, formValidations);


  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCrateProduct(
        {
          businessId: 1,
          categoryId: categoryId.id,
          measurementUnitId: measurementUnitId.id,
          name: name.trim(),
          barCode: '0',
          price: price
        });
    } else {
      putUpdateProduct(item.id,
        {
          businessId: 1,
          categoryId: categoryId.id,
          measurementUnitId: measurementUnitId.id,
          name: name.trim(),
          barCode: '0',
          price: price
        }
      );
    }
    handleClose();
    onResetForm();
  }
  const [modalCategory, setModalCategory] = useState(false);
  const [modalUnitMeasurement, setModalUnitMeasurement] = useState(false);
  const handleModalCategory = useCallback((value: boolean) => {
    setModalCategory(value);
  }, []);
  const handleModalUnitMeasurement = useCallback((value: boolean) => {
    setModalUnitMeasurement(value);
  }, []);
  return (
    <>
      {
        modalCategory &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Categorias:'
          opendrawer={modalCategory}
          handleDrawer={handleModalCategory}
        >
          <CategoryTable
            limitInit={5}
            itemSelect={(v) => {
              if (categoryId == null || categoryId.id != v.id) {
                onValueChange('categoryId', v)
                handleModalCategory(false)
              }
            }}
            items={categoryId == null ? [] : [categoryId.id]}
          />
        </ModalSelectComponent>
      }
      {
        modalUnitMeasurement &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Unidades de medida:'
          opendrawer={modalUnitMeasurement}
          handleDrawer={handleModalUnitMeasurement}
        >
          <UnitMeasurementTable
            limitInit={5}
            itemSelect={(v) => {
              if (measurementUnitId == null || measurementUnitId.id != v.id) {
                onValueChange('measurementUnitId', v)
                handleModalUnitMeasurement(false)
              }
            }}
            items={measurementUnitId == null ? [] : [measurementUnitId.id]}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Producto' : `${item.name}`}</DialogTitle>
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
              {
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
              }
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={categoryId != null ? 'Categoria' : ''}
                  title={categoryId != null ? categoryId.name : 'Categoria'}
                  onPressed={() => handleModalCategory(true)}
                  error={!!categoryIdValid && formSubmitted}
                  helperText={formSubmitted ? categoryIdValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={measurementUnitId != null ? 'Unidad de medida' : ''}
                  title={measurementUnitId != null ? measurementUnitId.name : 'Unidad de medida'}
                  onPressed={() => handleModalUnitMeasurement(true)}
                  error={!!measurementUnitIdValid && formSubmitted}
                  helperText={formSubmitted ? measurementUnitIdValid : ''}
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
