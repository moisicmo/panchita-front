import { OrderModel, OutputModel } from "@/models";
import { Collapse, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"

interface outputProps {
  openIndex: string;
  order: OrderModel;
}


export const OutputTable = (props: outputProps) => {
  const {
    openIndex,
    order,
  } = props;
  return (
    <TableRow
      style={{ backgroundColor: (openIndex == order.id) ? '#f2f2f2' : '#fff' }}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
        <Collapse in={openIndex == order.id} timeout="auto" unmountOnExit>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>SubTotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.outputIds.map((outputs: OutputModel) => {
                return (
                  <TableRow key={outputs.id}>
                    <TableCell>{outputs.productStatusId.productId.code}</TableCell>
                    <TableCell>{`${outputs.productStatusId.productId.name}-${outputs.productStatusId.name}`}</TableCell>
                    <TableCell>{outputs.price}</TableCell>
                    <TableCell>{outputs.quantity}</TableCell>
                    <TableCell>{outputs.price * outputs.quantity}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}
