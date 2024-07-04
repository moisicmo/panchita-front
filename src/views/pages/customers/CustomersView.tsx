import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { Add } from "@mui/icons-material";
import { CustomerModel, PermissionModel, RoleModel } from "@/models";
import { CreateCustomer, CustomerTable } from ".";
import { useAuthStore } from "@/hooks";

export const CustomersView = () => {
  const { roleUser } = useAuthStore();
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<CustomerModel | null>(null);

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
        <Typography variant="h6">Cliente</Typography>
        <ComponentButton
          text="Nuevo cliente"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
          disable={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "crear cliente")} />
      </Stack>
      <CustomerTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
      />
      {
        openDialog &&
        <CreateCustomer
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit, ...itemEdit?.user,id:itemEdit.id }}
        />
      }
    </>
  )
}
