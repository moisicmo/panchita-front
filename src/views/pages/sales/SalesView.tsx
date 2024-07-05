import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { SyntheticEvent, useEffect, useState } from "react";
import { SaleTable, UpdateOrder } from ".";
import { ExpandMore } from "@mui/icons-material";
import { BranchOfficeModel, OrderModel, ProductModel } from '@/models';
import { useBranchOfficeStore, useKardexProductStore } from "@/hooks";
import { CartDrawer } from "@/views/layout/CartDrawer";

export const SaleView = () => {
  const { branchOffices = [], getBranchOffices } = useBranchOfficeStore();
  const { kardexProductsSale = [] } = useKardexProductStore();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [order, setOrder] = useState<OrderModel | null>(null);
  
  useEffect(() => {
    getBranchOffices()
  }, []);

  const handleChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      console.log('hola')
      setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
      if (branchOffices.length === 1) {
        setExpanded(`${branchOffices[0].id}`);
      }
    }, [branchOffices]);

  return (
    <>
      <Typography variant="h6">Ordenes y ventas</Typography>
      {
        branchOffices.map((branchOffice: BranchOfficeModel) => {
          return (
            <Accordion
              key={branchOffice.id}
              expanded={expanded === `${branchOffice.id}`}
              onChange={handleChange(`${branchOffice.id}`)}
            >
              <AccordionSummary expandIcon={<ExpandMore />} >
                <Typography>{branchOffice.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {
                  (expanded === `${branchOffice.id}`) &&
                  <SaleTable
                    branchOfficeId={branchOffice.id}
                    handleEdit={(order) => { setOrder(order) }}
                  />
                }
              </AccordionDetails>
            </Accordion>
          );
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
