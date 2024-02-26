import { Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { format } from 'date-fns';
import esES from 'date-fns/locale/es';
import { KardexModel } from "@/models";

interface tableProps {
  open: boolean;
  KardexModelList: KardexModel[];
}

export const KardexTable = (props: tableProps) => {
  const { open, KardexModelList } = props;

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open}>
          <Typography sx={{ fontWeight: 'bold' }}>Movimientos:</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Razón</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {KardexModelList.map((KardexModel: KardexModel) => (
                <TableRow
                  key={KardexModel.id}
                  sx={{
                    backgroundColor: KardexModel.inputOrOutputType === 'inputs' ? '#FFCDD2' : '#C8E6C9',
                  }}
                >
                  <TableCell>{KardexModel.detail}</TableCell>
                  <TableCell>{KardexModel.inputOrOutputType === 'inputs' ? 'Entrada' : 'Salida'}</TableCell>
                  <TableCell>{KardexModel.input?.quantity ?? KardexModel.output?.quantity}</TableCell>
                  <TableCell>{KardexModel.input?.price ?? KardexModel.output?.price}</TableCell>
                  <TableCell>
                    {format(
                      new Date(KardexModel.input?.createdAt ?? KardexModel.output?.createdAt),
                      'dd MMMM yyyy HH:mm',
                      { locale: esES }
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
