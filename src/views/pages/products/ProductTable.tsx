import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useProductStore } from "@/hooks";
import { ProductModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
interface tableProps {
  handleEdit?: (product: ProductModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (ProductModel: ProductModel) => void;
  items?: any[];
}

export const ProductTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { products = [], getProducts, deleteProduct } = useProductStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getProducts()
  }, []);

  useEffect(() => {
    const filtered = products.filter((e: ProductModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())||
      e.code.toLowerCase().includes(query.toLowerCase())||
      e.category.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : products,
      page,
      rowsPerPage
    );
    setProductList(newList)
  }, [products, page, rowsPerPage, query])


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
              <TableCell sx={{ fontWeight: 'bold' }}>Descuento</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product: ProductModel) => {
              const isSelected = items.includes(product.id);
              return (
                <TableRow key={product.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(product)}
                      />
                    </TableCell>
                  }
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{product.measurementUnit.name}</TableCell>
                  <TableCell>{`${product.price} Bs.`}</TableCell>
                  <TableCell>{`${product.discount} ${product.typeDiscount === 'monto' ? 'Bs.' : '%'}`}</TableCell>
                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton onClick={() => handleEdit!(product)} >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteProduct(product.id)} >
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
        total={products.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
