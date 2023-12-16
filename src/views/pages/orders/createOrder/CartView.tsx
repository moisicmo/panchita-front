import { IconButton, Stack, Table, TableBody, TableCell, TableRow, Typography, styled } from "@mui/material";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
// import { useKardexProductStore } from "@/hooks";
import { OutputModel } from "@/models";
interface cartProps {
  outputIds: OutputModel[];
  subtractItem: (output: OutputModel) => void;
  addItem: (output: OutputModel) => void;
  removeItem: (output: OutputModel) => void;
  warehouseId: string;
  error?: boolean;
  helperText?: string;
}


export const CartView = (props: cartProps) => {
  const {
    outputIds,
    subtractItem,
    addItem,
    removeItem,
    // warehouseId,
    error,
    helperText,
  } = props;

  // const { kardexProducts = [] } = useKardexProductStore();


  const ElevatedIconButton = styled(IconButton)(({ theme }) => ({
    boxShadow: theme.shadows[1],
    borderRadius: '50%',
    padding: 3,
  }));


  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h6">Productos seleccionados</Typography>
        {
          outputIds
            .map((output: OutputModel, index: number) => {

              // const kardexProductList = kardexProducts.filter((e: KardexProductModel) => e.warehouseId.id == warehouseId && e.inputOrOutput.productStatusId.id == output.productStatusId.id);
              // const kardexProduct: KardexProductModel = kardexProductList[kardexProductList.length - 1];
              return (
                <div key={index} style={{ borderRadius: 10, border: '1px solid #ccc', padding: 5 }}>
                  <Typography>{output.productStatusId.productId.name} - {output.productStatusId.name}</Typography>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ padding: 0 }}>
                          Precio: {output.productStatusId.price} Bs.
                        </TableCell>
                        <TableCell style={{ padding: 0 }} >
                          SubTotal: {output.price * output.quantity} Bs.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ padding: 0 }}>
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <ElevatedIconButton
                              onClick={() => subtractItem({ ...output, quantity: output.quantity - 1 })}
                              disabled={output.quantity == 1}
                            >
                              <Remove />
                            </ElevatedIconButton>
                            <Typography>{output.quantity}</Typography>
                            <ElevatedIconButton
                              onClick={() => addItem({ ...output, quantity: output.quantity + 1 })}
                            // disabled={kardexProduct.stock == output.quantity}
                            >
                              <Add />
                            </ElevatedIconButton>
                          </Stack>
                        </TableCell>
                        <TableCell style={{ padding: 0 }} >
                          <IconButton onClick={() => removeItem(output)}>
                            <DeleteOutline color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )
            })
        }
      </Stack>
      {
        error && (
          <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
        )
      }
    </>
  );
}