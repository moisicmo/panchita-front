// import { ComponentSelectPicker } from "@/components";
// import { useForm, useKardexProductStore, useOrderStore, useProductStore, useWarehouseStore } from "@/hooks";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
// import { FormEvent, useEffect, useState } from "react";
// import { CartView, DetailSale, SerchProduct } from ".";
// import { CustomerModel, FormOderModel, FormOrderValidations, OrderModel, WarehouseModel } from "@/models";
// interface createProps {
//   open: boolean;
//   handleClose: () => void;
//   item: OrderModel | null;
// }
// const formFields: FormOderModel = {
//   warehouseId: null,
//   customerId: null,
//   outputIds: []
// }

// const formValidations: FormOrderValidations = {
//   warehouseId: [(value: WarehouseModel) => value != null, 'Debe ingresar la sucursal'],
//   customerId: [(value: CustomerModel) => value != null, 'Debe seleccionar al cliente'],
// }


// export const CreateOrder = (props: createProps) => {
//   const {
//     open,
//     handleClose,
//     item,
//   } = props;
//   const {
//     warehouseId, customerId, outputIds,
//     isFormValid, onValueChange,
//     warehouseIdValid, customerIdValid, outputIdsValid,
//   } = useForm(item ?? formFields, formValidations);

//   const { getProducts } = useProductStore();
//   const { warehouses = [], getWarehouses } = useWarehouseStore();
//   const { getAllKardexProducts } = useKardexProductStore();
//   const { postCreateOrder, putUpdateOrder } = useOrderStore();
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   useEffect(() => {
//     getWarehouses();
//     getProducts();
//     getAllKardexProducts();
//   }, []);

//   const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setFormSubmitted(true);
//     if (!isFormValid) return;
//     if (item == null) {
//       await postCreateOrder({ warehouseId: warehouseId.id, customerId, outputIds });
//     } else {
//       await putUpdateOrder(item.id, { warehouseId: warehouseId.id, customerId, outputIds });
//     }
//     handleClose();
//   }

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="lg" >
//       <DialogTitle>{item == null ? 'Nueva Orden' : `Orden ${item.id}`}</DialogTitle>
//       <form onSubmit={sendSubmit}>
//         <DialogContent>
//           <Grid container>
//             <Grid item xs={12} sm={warehouseId != null ? 5 : 12} sx={{ padding: '5px' }}>
//               <ComponentSelectPicker
//                 title='Sucursales'
//                 value={warehouseId == null ? '' : warehouseId.id}
//                 onChange={(value: string) => {
//                   onValueChange('warehouseId', warehouses.find((e: WarehouseModel) => e.id == value) as WarehouseModel);
//                 }}
//                 options={warehouses.map((e: WarehouseModel) => ({ id: e.id, name: e.name }))}
//                 error={!!warehouseIdValid && formSubmitted}
//                 helperText={formSubmitted ? warehouseIdValid : ''}
//               />
//               {
//                 warehouseId &&
//                 <SerchProduct
//                   outputIds={outputIds}
//                   pushItem={(item) => onValueChange('outputIds', [...outputIds, item])}
//                   warehouseId={warehouseId}
//                 />
//               }
//             </Grid>
//             {
//               warehouseId != null &&
//               <Grid item xs={12} sm={7} sx={{ padding: '5px' }}>
//                 <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
//                   <CartView
//                     outputIds={outputIds}
//                     subtractItem={(item) => onValueChange('outputIds', [...outputIds.map((output: OrderModel) => {
//                       if (item.id == output.id) {
//                         return { ...item }
//                       }
//                       return output;
//                     })])}
//                     addItem={(item) => onValueChange('outputIds', [...outputIds.map((output: OrderModel) => {
//                       if (item.id == output.id) {
//                         return { ...item }
//                       }
//                       return output;
//                     })])}
//                     removeItem={(item) => onValueChange('outputIds', [...outputIds.filter((output: OrderModel) => output.id != item.id)])}
//                     warehouseId={warehouseId.id}
//                     error={!!outputIdsValid && formSubmitted}
//                     helperText={formSubmitted ? outputIdsValid : ''}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
//                   <DetailSale
//                     outputIds={outputIds}
//                     value={customerId as CustomerModel}
//                     onChange={(value: string) => onValueChange('customerId', value)}
//                     error={!!customerIdValid && formSubmitted}
//                     helperText={formSubmitted ? customerIdValid : ''}
//                   />
//                 </Grid>
//               </Grid>
//             }
//           </Grid >
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => {
//             // onResetForm();
//             handleClose()
//           }}>Cancelar</Button>
//           <Button type="submit">
//             {item == null ? 'CREAR' : 'EDITAR'}
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   )
// }
