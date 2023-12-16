import { Stack, Typography } from "@mui/material"
import { SaleTable } from ".";


export const SalesView = () => {

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">Ventas</Typography>

      </Stack>
      <SaleTable
      />
    </>
  )
}
