import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { CreateRole, RoleTable, ShowPermisions } from ".";
import { Add } from "@mui/icons-material";
import { PermissionModel, RoleModel } from "@/models";

export const RolesView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<RoleModel | null>(null);
  const [opendrawer, setOpendrawer] = useState<any>({ state: false, items: [] });
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);
  const handlePermisions = (state: boolean, items: PermissionModel[]) => {
    console.log(items)
    setOpendrawer({ state, items })
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">Roles</Typography>
        <ComponentButton
          text="Nuevo rol"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>
      <RoleTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
        onViewPermisions={(items) => handlePermisions(true, items)}
      />
      {
        openDialog &&
        <CreateRole
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
      {
        <ShowPermisions
          open={opendrawer.state}
          handleClose={() => handlePermisions(false, [])}
          items={opendrawer.items}
        />
      }
    </>
  )
}
