import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import esES from 'date-fns/locale/es';
import { format } from "date-fns";
import { useReportStore } from "@/hooks";
import { OrderModel } from "@/models";

export const ReportTable = () => {

  const { reportData = [] } = useReportStore();

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#ffe8e9' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Nro</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Sucursal</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Monto total</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData.map((order: OrderModel) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{`${order.customer.user.name} ${order.customer.user.lastName}`}</TableCell>
              <TableCell>{order.branchOffice.name}</TableCell>
              <TableCell>{`${format(new Date(order.createdAt), 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>{order.stateSale ? 'vendido' : 'orden'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
