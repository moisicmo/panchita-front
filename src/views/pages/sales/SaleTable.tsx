import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useOrderStore } from "@/hooks";
import { OrderModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { Download, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { OutputTable } from "../orders";

interface tableProps {
  limitInit?: number;
}

export const SaleTable = (props: tableProps) => {
  const {
    limitInit = 10,
  } = props;

  const { ordersSold = [], getOrdersSold, getDocumentOrder } = useOrderStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [orderSoldList, setOrderSoldList] = useState<OrderModel[]>([]);
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getOrdersSold()
  }, []);

  useEffect(() => {
    const filtered = ordersSold.filter((e: OrderModel) =>
      e.warehouseId.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : ordersSold,
      page,
      rowsPerPage
    );
    setOrderSoldList(newList)
  }, [ordersSold, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Venta"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Nro Orden</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Sucursal</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Productos</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderSoldList.map((order: OrderModel) => {
              return (
                <React.Fragment key={order.id} >
                  <TableRow >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerId.name}</TableCell>
                    <TableCell>{order.warehouseId.name}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenIndex(openIndex == order.id ? null : order.id)}
                      >
                        {openIndex == order.id ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton
                          onClick={() => getDocumentOrder(order.id)}
                        >
                          <Download color="info" />
                        </IconButton>
                      </Stack>
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
        total={ordersSold.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
