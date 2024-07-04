import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { CreateProduct, ProductTable } from ".";
import { Add } from "@mui/icons-material";
import { PermissionModel, ProductModel, RoleModel } from "@/models";
import { useAuthStore } from "@/hooks";


export const ProductsView = () => {
  const { roleUser } = useAuthStore();
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<ProductModel | null>(null);

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
        <Typography variant="h6">Productos</Typography>
        <ComponentButton
          text="Nuevo Producto"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
          disable={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "crear producto")} />
      </Stack>
      <ProductTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
      />
      {
        openDialog &&
        <CreateProduct
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit }}
        />
      }
    </>
  )
}
