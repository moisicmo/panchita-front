import { ComponentButton, ComponentSearch, ComponentTablePagination } from "@/components";
import { useAuthStore, useKardexProductStore, useOrderStore } from "@/hooks";
import { OrderModel, PermissionModel, RoleModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, Download, EditOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { OutputTable } from ".";
import { format } from "date-fns";
import esES from 'date-fns/locale/es';

interface tableProps {
  branchOfficeId: number;
  handleEdit: (orderModel: OrderModel) => void;
  limitInit?: number;
}

export const SaleTable = (props: tableProps) => {
  const {
    branchOfficeId,
    handleEdit,
    limitInit = 10,
  } = props;

  const { roleUser } = useAuthStore();
  const { getProductsKardexByBranchOffice } = useKardexProductStore();
  const { orders = [], getOrders, getDocumentOrder, putUpdateOrderSold, deleteOrder } = useOrderStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [orderList, setOrderList] = useState<OrderModel[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getOrders(branchOfficeId);
    getProductsKardexByBranchOffice(branchOfficeId);
  }, []);

  useEffect(() => {
    const filtered = orders.filter((e: OrderModel) =>
      e.branchOffice.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : orders,
      page,
      rowsPerPage
    );
    setOrderList(newList)
  }, [orders, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Orden"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ffe8e9' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Nro Orden</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Sucursal</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Productos</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((order: OrderModel) => {
              return (
                <React.Fragment key={order.id} >
                  <TableRow >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer.user.name}</TableCell>
                    <TableCell>{order.branchOffice.name}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenIndex(openIndex == order.id ? null : order.id)}
                      >
                        {openIndex == order.id ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{`${format(new Date(order.createdAt), 'dd MMMM yyyy', { locale: esES })}`}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>{order.stateSale ? 'vendido' : 'orden'}</TableCell>
                    <TableCell align="left">
                      {
                        !order.state ? <Typography>ANULADO</Typography> :
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            {!order.stateSale && <IconButton onClick={() => handleEdit(order)}
                              disabled={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "editar orden")}>
                              <EditOutlined color="info" />
                            </IconButton>}
                            {!order.stateSale && <ComponentButton
                              text="Vender"
                              onClick={() => putUpdateOrderSold(order)}
                              disable={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "vender")}
                            />}
                            <IconButton
                              onClick={() => getDocumentOrder(order.id)}
                              disabled={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "descargar pdf")}
                            >
                              <Download color="info" />
                            </IconButton>
                            <IconButton
                              onClick={() => deleteOrder(order)}
                              disabled={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "eliminar orden o venta")}
                            >
                              <DeleteOutline color="error" />
                            </IconButton>
                          </Stack>
                      }
                    </TableCell>
                  </TableRow>
                  <OutputTable
                    openIndex={openIndex!}
                    order={order}
                  />
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={orders.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
