import { ComponentButton, ModalSelectComponent } from "@/components";
import { OrderModel, OutputModel } from "@/models"
import { Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CardCart } from "../../cart";
import { ProductSaleTable } from "../../sales";

interface orderProps {
  order: OrderModel;
  addItem: (output: OutputModel) => void;
  removeItem: (output: OutputModel) => void;
  updateOrder:()=>void;
}

export const UpdateOrder = (props: orderProps) => {
  const {
    order,
    addItem,
    removeItem,
    updateOrder,
  } = props;

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [total, setTotal] = useState(order.amount);

  useEffect(() => {
    const total = order.outputs.reduce((accumulator: number, currentProduct: OutputModel) => {
      return accumulator + (currentProduct.price * currentProduct.quantity);
    }, 0);
    setTotal(total);
  }, [order]);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);

  const [modalProductSale, setModalProductSale] = useState(false);
  const handleModalProductSale = useCallback((value: boolean) => {
    setModalProductSale(value);
  }, []);

  return (
    <>
      {
        modalProductSale &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Punto de venta:'
          opendrawer={modalProductSale}
          handleDrawer={handleModalProductSale}
        >
          <ProductSaleTable
            limitInit={10}
            branchOffice={order.branchOffice}
            order={order}
            addItem={(output) => addItem(output)}
            removeItem={(output) => removeItem(output)}
          />
        </ModalSelectComponent>
      }

      <Stack
        sx={{ px: 2 }}
        direction="column"
      >
        <Typography variant="h6">Orden</Typography>
        <Typography variant="h6">{`${order.branchOffice.name}`}</Typography>

        <div style={{ height: `${screenHeight / 1.5}px`, overflowY: 'auto' }}>
          {
            order.outputs.map((output: OutputModel,index:number) =>
              output.quantity > 0 && (
                <CardCart
                  key={`${index}`}
                  output={output}
                  addItem={() => addItem(output)}
                  removeItem={() => removeItem(output)}
                />
              )
            )
          }
        </div>
        <ComponentButton
          variant="outlined"
          text="ABRIR PUNTO DE VENTA"
          onClick={() => handleModalProductSale(true)} />
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ py: 1 }}>
          <Typography> Total a pagar: </Typography>
          <Typography> {`${total} Bs.`} </Typography>
        </Stack>
        {/* <DetailCart /> */}
        <ComponentButton
          text="ACTUALIZAR ORDEN"
          onClick={() => updateOrder()} />
      </Stack>
    </>
  )
}
