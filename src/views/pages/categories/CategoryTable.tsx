import { ComponentButton, ComponentSearch, ComponentTablePagination } from "@/components";
import { useAuthStore, useCategoryStore } from "@/hooks";
import { CategoryModel, PermissionModel, RoleModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CreateCategory } from ".";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

interface tableProps {
  limitInit?: number;
  itemSelect?: (customer: CategoryModel) => void;
  items?: any[];
}

export const CategoryTable = (props: tableProps) => {
  const {
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { roleUser } = useAuthStore();
  const { categories = [], getCategories, deleteCategory } = useCategoryStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<CategoryModel | null>(null);
  const [query, setQuery] = useState<string>('');
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);

  useEffect(() => {
    getCategories()
  }, []);

  useEffect(() => {
    const filtered = categories.filter((e: CategoryModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : categories,
      page,
      rowsPerPage
    );
    setCategoryList(newList)
  }, [categories, page, rowsPerPage, query])


  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <ComponentSearch
          title="Buscar Categoria"
          search={setQuery}
        />
        <ComponentButton
          text="Crear Categoria"
          onClick={() => handleDialog(true)}
          disable={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "crear categoria")}
        />
      </Stack>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ffe8e9' }}>
              <TableCell />
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryList.map((category: CategoryModel) => {
              const isSelected = items.includes(category.id);
              return (
                <TableRow key={category.id} >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => itemSelect!(category)}
                    />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell align="right">
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      <IconButton onClick={() => {
                        setItemEdit(category);
                        handleDialog(true);
                      }}
                        disabled={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "editar categoria")}>
                        <EditOutlined color="info" />
                      </IconButton>
                      <IconButton onClick={() => deleteCategory(category.id)}
                        disabled={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "eliminar categoria")} >
                        <DeleteOutline color="error" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={categories.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
      {
        openDialog &&
        <CreateCategory
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
    </>
  );
}
