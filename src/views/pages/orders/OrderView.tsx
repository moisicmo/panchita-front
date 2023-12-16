import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { OrderTable } from ".";
import { Add } from "@mui/icons-material";
import { OrderModel } from "@/models";
// import { CreateOrder } from "./createOrder";

export const OrderView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<OrderModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">Ordenes</Typography>
        <ComponentButton
          text="Nueva Orden"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>
      <OrderTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
      />
      {/* {
        openDialog &&
        <CreateOrder
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      } */}
    </>
  )
}
