import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { SyntheticEvent, useEffect, useState } from "react";
import { OrderTable, UpdateOrder } from ".";
import { ExpandMore } from "@mui/icons-material";
import { BranchOfficeModel, OrderModel, ProductModel } from '@/models';
import { useBranchOfficeStore, useKardexProductStore } from "@/hooks";
import { CartDrawer } from "@/views/layout/CartDrawer";

export const OrderView = () => {
  const { branchOffices = [], getBranchOffices } = useBranchOfficeStore();
  const { kardexProductsSale = [] } = useKardexProductStore();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [order, setOrder] = useState<OrderModel | null>(null);
  
  useEffect(() => {
    getBranchOffices()
  }, []);

  const handleChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Typography variant="h6">Ordenes y ventas</Typography>
      {
        branchOffices.map((branchOffice: BranchOfficeModel) => {
          return (
            <Accordion
              key={`${branchOffice.id}`}
              expanded={branchOffices.length == 1 ? true : expanded === `${branchOffice.id}`}
              onChange={handleChange(`${branchOffice.id}`)}
              defaultExpanded={branchOffices.length > 0}
            >
              <AccordionSummary expandIcon={<ExpandMore />} >
                <Typography>{`${branchOffice.name}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {
                  <OrderTable
                    branchOfficeId={branchOffice.id}
                    handleEdit={(order) => { setOrder(order) }}
                  />
                }
              </AccordionDetails>
            </Accordion>)
        })
      }
      {
        order &&
        <CartDrawer
          onClose={() => { setOrder(null) }}
          open={order != null} >
          <UpdateOrder
            order={order!}
            addItem={(item) => {
              const productSearch: ProductModel = kardexProductsSale.find((e: ProductModel) => e.id == item.product.id);
              const orderSearch = order.outputs.find((e) => (e.product.id == productSearch.id));
              const newOrder: OrderModel = {
                ...order,
                outputs: [
                  ...order.outputs.map((e) => {
                    if (e.product.id == orderSearch!.product.id) {
                      if (e.quantity < orderSearch!.quantityOrigin! ) {
                        return {
                          ...e,
                          quantity: e.quantity + 1
                        };
                      }
                    }
                    return e;
                  })
                ]
              }
              return setOrder(newOrder);
            }}
            removeItem={(item) => {
              const productSearch: ProductModel = kardexProductsSale.find((e: ProductModel) => e.id == item.product.id);
              const orderSearch = order.outputs.find((e) => (e.product.id == productSearch.id));
              const newOrder: OrderModel = {
                ...order,
                outputs: [
                  ...order.outputs.map((e) => {
                    if (e.product.id == orderSearch!.product.id) {
                      if (e.quantity > 0) {
                        return {
                          ...e,
                          quantity: e.quantity - 1
                        };
                      }
                    }
                    return e;
                  })
                ]
              }
              return setOrder(newOrder);
            }}
          />
        </CartDrawer>
      }
    </>
  )
}
