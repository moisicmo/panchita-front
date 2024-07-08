import { ComponentInput, ComponentSelect, MaterialUISwitch, ModalSelectComponent } from "@/components"
import { useForm, useProductStore } from "@/hooks";
import { CategoryModel, FormProductModel, FormProductValidations, MeasurementUnitModel, ProductModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { CategoryTable } from "../categories";
import { MeasurementUnitTable } from "../measurementUnits";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: ProductModel | null;
}

const formFields: FormProductModel = {
  name: '',
  price: 0,
  discount: 0,
  typeDiscount: 'monto',
  category: null,
  measurementUnit: null,
}

const formValidations: FormProductValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  price: [(value: number) => value != 0, 'Debe ingresar un precio'],
  category: [(value: CategoryModel) => value != null, 'Debe ingresar una categoria'],
  measurementUnit: [(value: MeasurementUnitModel) => value != null, 'Debe ingresar una unidad de medida'],
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
    name, price, discount, typeDiscount, category, measurementUnit,
    onInputChange, isFormValid, onResetForm, onValueChange,
    nameValid, priceValid, categoryValid, measurementUnitValid,
  } = useForm(item ?? formFields, formValidations);


  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCrateProduct(
        {
          businessId: 1,
          categoryId: category.id,
          measurementUnitId: measurementUnit.id,
          name: name.trim(),
          barCode: '0',
          price: price,
          discount: discount,
          typeDiscount: typeDiscount,
        });
    } else {
      putUpdateProduct(item.id,
        {
          businessId: 1,
          categoryId: category.id,
          measurementUnitId: measurementUnit.id,
          name: name.trim(),
          barCode: '0',
          price: price,
          discount: discount,
          typeDiscount: typeDiscount,
        }
      );
    }
    handleClose();
    onResetForm();
  }
  const [modalCategory, setModalCategory] = useState(false);
  const [modalMeasurementUnit, setModalMeasurementUnit] = useState(false);
  const handleModalCategory = useCallback((value: boolean) => {
    setModalCategory(value);
  }, []);
  const handleModalMeasurementUnit = useCallback((value: boolean) => {
    setModalMeasurementUnit(value);
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
              if (category == null || category.id != v.id) {
                onValueChange('category', v)
                handleModalCategory(false)
              }
            }}
            items={category == null ? [] : [category.id]}
          />
        </ModalSelectComponent>
      }
      {
        modalMeasurementUnit &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Unidades de medida:'
          opendrawer={modalMeasurementUnit}
          handleDrawer={handleModalMeasurementUnit}
        >
          <MeasurementUnitTable
            limitInit={5}
            itemSelect={(v) => {
              if (measurementUnit == null || measurementUnit.id != v.id) {
                onValueChange('measurementUnit', v)
                handleModalMeasurementUnit(false)
              }
            }}
            items={measurementUnit == null ? [] : [measurementUnit.id]}
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
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Precio"
                  name="price"
                  value={price}
                  onChange={(V: string) => onInputChange(V, true)}
                  error={!!priceValid && formSubmitted}
                  helperText={formSubmitted ? priceValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={category != null ? 'Categoria' : ''}
                  title={category != null ? category.name : 'Categoria'}
                  onPressed={() => handleModalCategory(true)}
                  error={!!categoryValid && formSubmitted}
                  helperText={formSubmitted ? categoryValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={measurementUnit != null ? 'Unidad de medida' : ''}
                  title={measurementUnit != null ? measurementUnit.name : 'Unidad de medida'}
                  onPressed={() => handleModalMeasurementUnit(true)}
                  error={!!measurementUnitValid && formSubmitted}
                  helperText={formSubmitted ? measurementUnitValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Descuento"
                  name="discount"
                  value={discount}
                  onChange={(V: string) => onInputChange(V, true)}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <Stack direction="row" alignItems="center" justifyContent="center">
                  <Typography>Monto</Typography>
                  <MaterialUISwitch
                    checked={typeDiscount != 'monto'}
                    onChange={(event) => {

                      if (event.target.checked) {
                        onValueChange('typeDiscount', 'porcentaje')
                      } else {
                        onValueChange('typeDiscount', 'monto')
                      }
                    }}
                  />
                  <Typography>Porcentaje</Typography>
                </Stack>
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button 
            onClick={() => {
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
