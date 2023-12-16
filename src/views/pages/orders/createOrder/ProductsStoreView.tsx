import { ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { OutputModel, ProductModel, ProductStatusModel, WarehouseModel } from "@/models";
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { Box, Button, Collapse, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";

interface storeProps {
  product: ProductModel;
  pushItem: (output: OutputModel) => void;
  warehouseId: WarehouseModel
}
interface rowProps {
  productStatus: ProductStatusModel;
}
const formFields = {
  quantity: ''
}

export const ProductsStoreView = (props: storeProps) => {
  const {
    product,
    pushItem,
    warehouseId
  } = props;
  const [openIndex, setOpenIndex] = useState<any>(null);



  function RowProductStatus(props: rowProps) {
    const {
      productStatus
    } = props;
    const { quantity, onInputChange } = useForm(formFields);
    const AddItem = () => {
      if (quantity === "") return;
      const output: OutputModel = {
        productStatusId: productStatus,
        warehouseId: warehouseId,
        price: productStatus.price,
        quantity: parseInt(quantity),
        discount: 0,
        typeDiscount: 'Monto',
      }
      pushItem(output);
    }
    return (
      <>
        <TableRow >
          <TableCell component="th" scope="row" style={{ padding: 0 }}>
            {productStatus.name}
          </TableCell>
          <TableCell component="th" style={{ padding: 0 }}>
            <ComponentInput type="text" label="" name="quantity" value={quantity} onChange={(v: any) => onInputChange(v, false, true)} />
          </TableCell>
          <TableCell component="th">
            <Button
              onClick={() => AddItem()}
              style={{ padding: 0 }}
            >
              Agregar
            </Button>
          </TableCell>
        </TableRow>
      </>
    )
  }
  return (
    <>
      <TableRow key={product.id} >
        <TableCell component="th">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              if (openIndex == product.id) {
                setOpenIndex(null)
              } else {
                setOpenIndex(product.id);
              }
            }}
          >
            {openIndex == product.id ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
          </IconButton>
        </TableCell>
        <TableCell component="th">
          {product.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openIndex == product.id} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Stack direction="row" justifyContent="space-between">
                <Stack spacing={1}>
                  <Typography>Estados del producto: {product.name}</Typography>
                </Stack>
              </Stack>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Estado</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.productStatus.map((productStatus) => (
                    <RowProductStatus
                      key={productStatus.id}
                      productStatus={productStatus}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}