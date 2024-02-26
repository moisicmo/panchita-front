import { Typography } from "@mui/material"
import { ComponentSelect, ModalSelectComponent } from "@/components";
import { useCallback, useState } from "react";
import { CreateCustomer, CustomerTable } from "../customers";
import { useCartStore } from "@/hooks";


interface cartProps {
  error?: boolean;
  helperText?: string;
}

export const DetailCart = (props: cartProps) => {
  const {
    error,
    helperText,
  } = props;
  const { customer, setCustomer } = useCartStore();
  const [modalCustomer, setModalCustomer] = useState(false);
  const [openDialog, setopenDialog] = useState(false);
  // const [itemEdit, setItemEdit] = useState<CustomerModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    // if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);

  const handleModalCustomer = useCallback((value: boolean) => {
    setModalCustomer(value);
  }, []);

  return (
    <>
      {
        modalCustomer &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Cliente:'
          opendrawer={modalCustomer}
          handleDrawer={handleModalCustomer}
          onClickButton={() => handleDialog(true)}
          titleButton='Crear Cliente'
        >
          <CustomerTable
            limitInit={5}
            stateSelect={true}
            itemSelect={(v) => {
              if (customer == null || customer.id != v.id) {
                setCustomer(v);
              }else{
                setCustomer(null);
              }
              handleModalCustomer(false);
            }}
            items={customer == null ? [] : [customer.id]}
          />
        </ModalSelectComponent>
      }
      <ComponentSelect
        label={customer != null ? 'Cliente' : ''}
        title={customer != null ? `${customer.user.name} ${customer.user.lastName} - ${customer.user.numberDocument}` : 'Cliente'}
        onPressed={() => handleModalCustomer(true)}
      />
      {
        error && (
          <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
        )
      }
      {
        openDialog &&
        <CreateCustomer
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={null}
        />
      }
    </>
  )
}