import { ComponentButton, ModalSelectComponent } from "@/components";
import { OrderModel, OutputModel } from "@/models"
import { Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CardCart } from "../../cart";
import { ProductSaleTable } from "../../sales";
import { useOrderStore } from "@/hooks";

interface orderProps {
  order: OrderModel;
  addItem: (output: OutputModel) => void;
  removeItem: (output: OutputModel) => void;
}

export const UpdateOrder = (props: orderProps) => {
  const {
    order,
    addItem,
    removeItem,
  } = props;

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [total, setTotal] = useState(order.amount);
  const { putUpdateOrder } = useOrderStore();
  const [cartOrder, setCartOrder] = useState<OutputModel[]>([]);

  useEffect(() => {
    const total = order.outputs.reduce((accumulator: number, currentProduct: OutputModel) => {
      return accumulator + (currentProduct.price * currentProduct.quantity);
    }, 0);
    const totalCart = cartOrder.reduce((accumulator: number, currentProduct: OutputModel) => {
      return accumulator + (currentProduct.product.price * currentProduct.quantity);
    }, 0);
    setTotal(total+totalCart);
  }, [order,cartOrder]);

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



  const handleAdd=(output:OutputModel)=>{
    const item = cartOrder.find((item:OutputModel)=> item.product.id == output.product.id);
    
    let newOrder:OutputModel[];

    if(item){
      newOrder = [...cartOrder.map((e)=>{
        if (e.product.id === output.product.id && e.product.branchOfficeId === order.branchOffice.id) {
          if (e.quantity < e.product.stock) {
            return {
              ...e,
              quantity: e.quantity + 1,
            };
          }
        }
        return e;
      })];
      setCartOrder(newOrder);
    }else{
      setCartOrder([...cartOrder,output]);
    }
  }
  const handleRemove=(output:OutputModel)=>{
    let newOrder:OutputModel[];
    newOrder = [...cartOrder.map((e)=>{
        if(e.product.id === output.product.id && e.product.branchOfficeId === order.branchOffice.id){
          if(e.quantity > 1){
            return {
              ...e,
              quantity: e.quantity - 1
            } 
          } else {
            return null;
          }
        }
        return e;
      }).filter((e) => e !== null) as OutputModel[]];
      setCartOrder(newOrder);
  }
  
  const handleUpdateOrder = () => {
    const data = {
      branchOfficeId: order!.branchOffice.id,
      customerId: order!.customer.id,
      paymentMethodId: 1,
      outputs: order.outputs,
      newOutputs: cartOrder.filter((e) => e.quantity > 0),
    }
    console.log(data);
    putUpdateOrder(order.id, data);
  }
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
            addItem={(output) => handleAdd(output)}
            removeItem={(output)=>handleRemove(output)}
            cartOrder = {cartOrder}
          />
        </ModalSelectComponent>
      }

      <Stack
        sx={{ px: 2 }}
        direction="column"
      >
        <Typography variant="h6">{`${order.branchOffice.name}`}</Typography>

        <div style={{ height: `${screenHeight / 1.5}px`, overflowY: 'auto' }}>
        <Typography variant="h6">Orden</Typography>
          {
            order.outputs.map((output: OutputModel,index:number) =>
                <CardCart
                  key={`${index}`}
                  output={output}
                  addItem={() => addItem(output)}
                  removeItem={() => removeItem(output)}
                />
            )
          }
        <Typography variant="h6">Carrito</Typography>
        {
            cartOrder.map((output:OutputModel) => (
              <CardCart
                key={`${output.product.id}-${output.product.branchOfficeId}`}
                output={output}
                addItem={()=>handleAdd(output)}
                removeItem={()=>handleRemove(output)}
                />
            ))
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
          onClick={() => handleUpdateOrder()} />
      </Stack>
    </>
  )
}
