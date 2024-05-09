import { Grid } from "@mui/material"
import { Event } from "@mui/icons-material";
import { OrderCard } from "./OrderCard"
import { useKardexProductStore, useOrderStore } from "@/hooks";
import { useEffect } from "react";
import { OrderModel } from "@/models";

interface tableProps {
  branchOfficeId: number;
}

export const OrderByBranchOffice = (props: tableProps) => {
  const {
    branchOfficeId,
  } = props;

  const { getProductsKardexByBranchOffice } = useKardexProductStore();
  const { orders = [], getOrders } = useOrderStore();
  useEffect(() => {
    getOrders(branchOfficeId);
    getProductsKardexByBranchOffice(branchOfficeId);
  }, []);
  return (
    <>
      <Grid container spacing={3}>
        {
          orders.filter((e: OrderModel) => e.state && !e.delivery).map((order: OrderModel) => {
            return (<Grid key={order.id} item xs={12} sm={6} lg={3}>
              <OrderCard
                sx={{ height: '100%' }}
                value={`${order.customer.user.name}`}
                title={`Pedido ${order.id}`}
              >
                <Event />
              </OrderCard>
            </Grid>)
          })
        }
      </Grid>
    </>
  )
}
