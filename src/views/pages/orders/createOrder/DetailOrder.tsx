import { Button, IconButton, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import { useEffect } from "react";
import { CancelOutlined } from "@mui/icons-material";
import { useCustomerStore, useForm } from "@/hooks";
import { ComponentInput } from "@/components";
import { CustomerModel, OutputModel } from "@/models";


interface cartProps {
  outputIds: OutputModel[];
  value: CustomerModel | null;
  onChange: (value: any) => void;
  error?: boolean;
  helperText?: string;
}

const formFields = {
  search: '',
}


export const DetailSale = (props: cartProps) => {
  const {
    outputIds,
    value,
    onChange,
    error,
    helperText,
  } = props;

  const { search, onInputChange } = useForm(formFields);

  const { customers = [], getCustomers } = useCustomerStore();

  useEffect(() => {
    getCustomers();
  }, []);


  const total = outputIds.reduce((sum: number, element: OutputModel) => sum + (element.quantity * element.price), 0);
  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h6">Detalles de la orden</Typography>
      </Stack>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          <TableRow>
            <TableCell component="th">
              Total a pagar:
            </TableCell>
            <TableCell component="th">
              {total} Bs.
            </TableCell>
          </TableRow>
          {
            value != null && <TableRow>
              <TableCell component="th" style={{ padding: 0 }}>
                Cliente: {value.name}
              </TableCell>
              <TableCell component="th" style={{ padding: 0 }}>
                <IconButton onClick={() => onChange(null)}>
                  <CancelOutlined color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
      {
        value == null && <>
          <ComponentInput
            type="text"
            label="Buscar Cliente"
            name="search"
            value={search}
            onChange={(v: any) => onInputChange(v, true)}
          />
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {customers
                .filter((customer: CustomerModel) =>
                  search !== "" &&
                  (customer.name.trim().toUpperCase().includes(search.trim().toUpperCase()) ||
                    customer.numberDocument.toString().includes(search.trim().toUpperCase()))
                )
                .map((customer: CustomerModel) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <Button
                        fullWidth
                        variant="outlined"
                        style={{ margin: 5 }}
                        onClick={() => onChange(customer)}
                      >
                        {customer.name}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      }
      {
        error && (
          <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
        )
      }
    </>
  )
}