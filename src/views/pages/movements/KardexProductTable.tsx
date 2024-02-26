import { ComponentSearch } from "@/components";
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { KardexProductModel } from "@/models";
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import React from "react";
import { KardexTable } from ".";


interface tableProps {
  kardexProductList: KardexProductModel[];
}

export const KardexProductTable = (props: tableProps) => {
  const {
    kardexProductList,
  } = props;
  const [kardexProduct, setkardexProduct] = useState(kardexProductList);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const filtered = kardexProductList.filter((e: KardexProductModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())||
      e.code.toLowerCase().includes(query.toLowerCase())
    );
    setkardexProduct(filtered)
  }, [kardexProductList, query])

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar producto"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Código de barras</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Movimientos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kardexProduct.map((kardexProductModel: KardexProductModel) => {
              return (
                <React.Fragment key={kardexProductModel.id} >
                  <TableRow >
                    <TableCell>{kardexProductModel.code}</TableCell>
                    <TableCell>{kardexProductModel.name}</TableCell>
                    <TableCell>{kardexProductModel.barCode}</TableCell>
                    <TableCell>{kardexProductModel.stock}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        sx={{ p: 0 }}
                        onClick={() => setOpenIndex(openIndex == kardexProductModel.id ? null : kardexProductModel.id)}
                      >
                        {openIndex == kardexProductModel.id ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {
                    <KardexTable
                      open={openIndex == kardexProductModel.id}
                      KardexModelList={kardexProductModel.kardex}
                    />}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
