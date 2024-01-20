import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import esES from 'date-fns/locale/es';
import { format } from "date-fns";
import { useReportStore } from "@/hooks";

export const ReportTable = () => {

  const { reportData = [] } = useReportStore();

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Paciente</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Monto total</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Etapa</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {reportData.map((treatment: TreatmentModel) => (
            <TableRow key={treatment.id}>
              <TableCell>{treatment.description}</TableCell>
              <TableCell>{`${treatment.patient.user.name} ${treatment.patient.user.lastName}`}</TableCell>
              <TableCell>{`${format(new Date(treatment.date), 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}</TableCell>
              <TableCell>{treatment.totalAmount}</TableCell>
              <TableCell>{treatment.stageType.name}</TableCell>
              <TableCell>{treatment.state}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  )
}
