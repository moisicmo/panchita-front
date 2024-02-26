import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { SyntheticEvent, useEffect, useState } from "react";
import { OrderTable, UpdateOrder } from ".";
import { ExpandMore } from "@mui/icons-material";
import { BranchOfficeModel, OrderModel, ProductModel } from '@/models';
import { useBranchOfficeStore, useKardexProductStore, useOrderStore } from "@/hooks";
import { CartDrawer } from "@/views/layout/CartDrawer";

export const OrderView = () => {
  const { branchOffices = [], getBranchOffices } = useBranchOfficeStore();
  const { putUpdateOrder } = useOrderStore();
  const { kardexProductsSale = [] } = useKardexProductStore();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [order, setOrder] = useState<OrderModel | null>(null);

  const handleChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  useEffect(() => {
    getBranchOffices()
  }, []);

  const updateOrder = () => {
    console.log(order);
    const data = {
      branchOfficeId: order!.branchOffice.id,
      customerId: order!.customer.id,
      paymentMethodId: 1,
      outputs: order!.outputs.filter((e) => e.quantity > 0),
    }
    putUpdateOrder(order!.id, data);
  }

  return (
    <>
      <Typography variant="h6">Ordenes y ventas</Typography>
      {
        branchOffices.map((branchOffice: BranchOfficeModel) => {
          return (
            <Accordion
              key={`${branchOffice.id}`}
              expanded={expanded === `${branchOffice.id}`} onChange={handleChange(`${branchOffice.id}`)}>
              <AccordionSummary expandIcon={<ExpandMore />} >
                <Typography>{`${branchOffice.name}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {expanded === `${branchOffice.id}` &&
                  <OrderTable
                    branchOfficeId={parseInt(expanded)}
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
              const orderSearch = order.outputs.find((e) => (e.product.id == productSearch.id) && (e.price == productSearch.price));
              if (orderSearch && (productSearch.price == orderSearch.price)) {
                const stock = productSearch.stock! + (orderSearch?.quantityOrigin || 0);
                const newOrder: OrderModel = {
                  ...order,
                  outputs: [
                    ...order.outputs.map((e) => {
                      if (
                        (e.product.id == orderSearch.product.id) &&
                        (e.price === orderSearch.price) &&
                        (e.quantity < stock)
                      ) {
                        return { ...e, quantity: e.quantity + 1 }
                      }
                      return e;
                    })
                  ]
                }
                return setOrder(newOrder);
              }
              const newOrder: OrderModel = {
                ...order,
                outputs: [
                  ...order.outputs,
                  {
                    ...item,
                    price: productSearch.price,
                    quantity: 1,
                    quantityOrigin: undefined
                  }
                ]
              }
              return setOrder(newOrder);
            }}
            removeItem={(item) => {
              const productSearch: ProductModel = kardexProductsSale.find((e: ProductModel) => e.id == item.product.id);
              const orderSearch = order.outputs.find((e) => (e.product.id == productSearch.id) && (e.price == productSearch.price));
              console.log('productSearch', productSearch);
              if (orderSearch && (productSearch.price == orderSearch.price)) {
                console.log('orderSearch', orderSearch);
                const neworder: OrderModel = {
                  ...order,
                  outputs: [
                    ...order.outputs.map((e) => {
                      if ((e.product.id == orderSearch!.product.id) && (e.price === orderSearch!.price)) {
                        return { ...e, quantity: e.quantity - 1 }
                      }
                      return e;
                    })
                  ]
                };
                return setOrder(neworder);
              }
              const newOrder: OrderModel = {
                ...order,
                outputs: [
                  ...order.outputs.map((e)=>{
                    if(e.product.id == item.product.id){
                      return {...e,quantity:e.quantity -1}
                    }
                    return e;
                  })
                ]
              };
              setOrder(newOrder);
            }}
            updateOrder={() => updateOrder()}
          />
        </CartDrawer>
      }
    </>
  )
}
