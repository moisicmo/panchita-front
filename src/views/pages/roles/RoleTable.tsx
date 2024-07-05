import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useAuthStore, useRoleStore } from "@/hooks";
import { PermissionModel, RoleModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (role: RoleModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (role: RoleModel) => void;
  items?: any[];
  onViewPermisions?: (values: PermissionModel[]) => void;
}


export const RoleTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    items = [],
    limitInit = 10,
    onViewPermisions,
  } = props;

  const { roleUser } = useAuthStore();
  const { roles = [], getRoles, deleteRole } = useRoleStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [roleList, setRoleList] = useState<RoleModel[]>([]);
  const [query, setQuery] = useState<string>('');


  useEffect(() => {
    getRoles()
  }, []);

  useEffect(() => {
    const filtered = roles.filter((e: RoleModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : roles,
      page,
      rowsPerPage
    );
    setRoleList(newList)
  }, [roles, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Rol"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect&&<TableCell sx={{ fontWeight: 'bold' }}></TableCell>}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Permisos</TableCell>}
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {roleList.map((role: RoleModel) => {
              const isSelected = items.includes(role.id);
              return (
                <TableRow key={role.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(role)}
                      />
                    </TableCell>
                  }
                  <TableCell>{role.name}</TableCell>
                  {
                    !stateSelect && <TableCell>
                      <IconButton
                        onClick={() => onViewPermisions!(role.permissions)}
                      >
                        <RemoveRedEyeOutlined color="info" />
                      </IconButton>
                    </TableCell>
                  }
                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton
                          onClick={() => handleEdit!(role)}
                          disabled={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "editar rol")}
                        >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteRole(role.id)}
                          disabled={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "eliminar rol")} >
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={roles.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
