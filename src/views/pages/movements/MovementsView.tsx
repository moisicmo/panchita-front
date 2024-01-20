import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { CreateInputProduct, MovementTable } from ".";
import { Add } from "@mui/icons-material";

export const MovementsView = () => {
  const [openDialog, setopenDialog] = useState(false);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">Movimientos</Typography>
        <ComponentButton
          text="Nueva Recepciön"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>
      <MovementTable />
      {
        openDialog &&
        <CreateInputProduct
          open={openDialog}
          handleClose={() => handleDialog(false)}
        />
      }
    </>
  )
}
