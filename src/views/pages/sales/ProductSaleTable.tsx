import { ComponentButton, ComponentSearch, ComponentTablePagination } from "@/components";
import { useCartStore, useKardexProductStore } from "@/hooks";
import { BranchOfficeModel, OrderModel, OutputModel, ProductModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { Add, Remove } from "@mui/icons-material";
import { Stack, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";


interface tableProps {
  branchOffice: BranchOfficeModel;
  limitInit?: number;
  order?: OrderModel;
  addItem: (product: OutputModel) => void;
  removeItem: (product: OutputModel) => void;
}

export const ProductSaleTable = (props: tableProps) => {
  const {
    branchOffice,
    limitInit = 10,
    order = null,
    addItem,
    removeItem,
  } = props;

  const { kardexProductsSale = [], getProductsKardexByBranchOffice } = useKardexProductStore();
  const { cart = [] } = useCartStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getProductsKardexByBranchOffice(branchOffice.id);
  }, [branchOffice]);

  useEffect(() => {
    const filtered = kardexProductsSale.filter((e: ProductModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );

    const newList = applyPagination(
      query !== '' ? filtered : kardexProductsSale,
      page,
      rowsPerPage
    );
    setProductList(newList);
  }, [kardexProductsSale, page, rowsPerPage, query]);

  const handleAdd = (product: ProductModel) => {
    let item:OutputModel = cart.find((output: OutputModel) => output.product.id == product.id && output.product.branchOfficeId == product.branchOfficeId);
    if(!item){
      const outputModel: OutputModel = {
        price: 0,
        quantity: 1,
        discount: 0.00,
        typeDiscount: 'monto',
        product: product,
      }
      item = {...outputModel}
    }
    addItem(item);
  }
  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Producto"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Codigo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Categoria</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Und. medida</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              productList.map((product: ProductModel) => {
                let item: OutputModel | undefined;
                if (order != null) {
                  item = order.outputs.find((item) => item.product.id == product.id) as OutputModel;
                } else {
                  item = cart.find((item: OutputModel) => item.product.id == product.id && item.product.branchOfficeId == product.branchOfficeId)
                }
                return (
                  <TableRow key={`${product.id}-${product.branchOfficeId}`} >
                    <TableCell>{product.code}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>{product.measurementUnit.name}</TableCell>
                    <TableCell>{`${product.price} Bs.`}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell >
                      <Stack direction="row" >
                        <ComponentButton
                          variant="outlined"
                          maxWidth="36px"
                          minWidth="36px"
                          onClick={() => handleAdd(product)}
                          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
                        {
                          item && item.quantity > 0 &&
                          <>
                            <Typography sx={{ px: 1 }} >{item.quantity}</Typography>
                            <ComponentButton
                              variant="outlined"
                              maxWidth="36px"
                              minWidth="36px"
                              onClick={() => removeItem(item!) }
                              startIcon={<SvgIcon fontSize="small"><Remove /></SvgIcon>} />
                          </>
                        }
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={productList.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
