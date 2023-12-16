import { ProductModel, ProductStatusModel } from "@/models";
import { Add } from "@mui/icons-material"
import { Box, Button, Collapse, Stack, SvgIcon, TableCell, TableRow, Typography } from "@mui/material"
import { CreateProductStatus, ProductStatusTable } from ".";
import { useCallback, useState } from "react";

interface productStatusProps {
  openIndex: string;
  product: ProductModel;
  stateSelect?: boolean;
  itemSelect?: (productStatus: ProductStatusModel) => void;
  items?: any[];
}

export const ProductStatusView = (props: productStatusProps) => {
  const {
    openIndex,
    product,
    stateSelect = false,
    itemSelect,
    items = [],
  } = props;

  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<ProductStatusModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);

  return (
    <>
      <TableRow
        style={{ backgroundColor: (openIndex == product.id) ? '#f2f2f2' : '#fff' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={openIndex == product.id} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Stack direction="row" justifyContent="space-between">
                <Stack spacing={1}>
                  <Typography>Estados del producto: {product.name}</Typography>
                </Stack>
                <div>
                  <Button
                    onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                    variant="contained"
                  >
                    Nuevo estado
                  </Button>
                </div>
              </Stack>
              <ProductStatusTable
                product={product}
                stateSelect={stateSelect}
                itemSelect={itemSelect}
                handleEdit={(v) => {
                  setItemEdit(v)
                  handleDialog(true)
                }}
                items={items}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {
        openDialog &&
        <CreateProductStatus
          productId={product.id}
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
    </>
  )
}
