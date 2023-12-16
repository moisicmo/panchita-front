import { PermissionModel } from '@/models';
import { Drawer, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

interface tableProps {
  open: boolean;
  handleClose: () => void;
  items: PermissionModel[];
}


export const ShowPermisions = (props: tableProps) => {
  const {
    open,
    handleClose,
    items = [],
  } = props;
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: '50vh',
          top: 'auto',
          bottom: 0,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        },
      }}
    >
      <div style={{ padding: '16px' }}>
        <Typography variant="h6">Permisos</Typography>
      </div>
      <TableContainer component={Paper} style={{ overflowY: 'auto' }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((permission: PermissionModel) => (
              <TableRow key={permission.id}>
                <TableCell component="th" scope="row">
                  {permission.name}
                </TableCell>
                <TableCell>{permission.module}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Drawer>
  )
}
