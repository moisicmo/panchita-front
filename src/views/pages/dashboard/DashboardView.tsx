import { Container, Grid, Typography } from "@mui/material";
import { Event, Person2Outlined } from "@mui/icons-material";
import { OverviewCard } from "./OverviewCard";
import { useEffect } from "react";
import { useReportStore } from "@/hooks";
import { OverviewBars } from ".";

export const DashboardView = () => {
  const { dashboard, getDashboard } = useReportStore();
  useEffect(() => {
    getDashboard();
  }, [])

  return (
    <Container maxWidth="xl">
      {
        dashboard &&
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={2}>
              <OverviewCard
                sx={{ height: '100%' }}
                value={dashboard.countCustomers}
                title="Clientes"
              >
                <Event />
              </OverviewCard>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <OverviewCard
                sx={{ height: '100%' }}
                value={dashboard.countBranchOffices}
                title="Sucursales"
              >
                <Event />
              </OverviewCard>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <OverviewCard
                sx={{ height: '100%' }}
                value={dashboard.countProducts}
                title="Productos"
              >
                <Event />
              </OverviewCard>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <OverviewCard
                sx={{ height: '100%' }}
                value={dashboard.countOrders}
                title="Ordenes"
              >
                <Person2Outlined />
              </OverviewCard>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <OverviewCard
                sx={{ height: '100%' }}
                value={dashboard.countSales}
                title="Ventas"
              >
                <Person2Outlined />
              </OverviewCard>
            </Grid>
          </Grid>
          <Typography>Cant. Ventas vs Tiempo</Typography>
          <Grid container spacing={3}>

          {
            dashboard.SalesLineTime.map((e: any) => {
              return (
                <Grid key={e.branchOffice.id} item xs={12} sm={6}>
                  <OverviewBars
                    title={e.branchOffice.name}
                    months={e.months}
                    salesCount={e.salesCount}
                    />
                </Grid>
              )
            })
          }
          </Grid>
        </>
      }
    </Container>
  )
}
