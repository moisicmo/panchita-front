import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { CreateInputProduct, MovementTable } from ".";
import { Add } from "@mui/icons-material";
import { useAuthStore } from "@/hooks";
import { PermissionModel, RoleModel } from "@/models";

export const MovementsView = () => {
  const { roleUser } = useAuthStore();
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
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
          disable={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "crear ingreso de productos")} />
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
