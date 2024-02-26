import { ComponentButton } from "@/components";
import { useCartStore, useOrderStore } from "@/hooks";
import { OutputModel } from "@/models";
import { Stack, Typography } from "@mui/material";
import { CardCart, DetailCart } from ".";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Output {
  productId: number;
  quantity: number;
  price: number;
  discount: number;
  typeDiscount: string;
}

export const CartView = () => {
  const { cart = [], addCard,removeCard, branchOffice, customer } = useCartStore();
  // const { addCard, removeCard } = useCartStore();
  const [validate, setValidate] = useState(false);
  const { postCreateOrder } = useOrderStore();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);

  useEffect(() => {
    const total = cart.reduce((accumulator: number, output: OutputModel) => {
      return accumulator + (output.product.price * output.quantity);
    }, 0);
    setTotal(total);
    setValidate(!validateCart());
  }, [cart,customer,branchOffice]);


  const validateCart = () => {
    if (customer == null || branchOffice == null || cart.length == 0) {
      return false;
    }
    return true;
  }
  const createOrder = () => {
    if(customer == null)Swal.fire('', 'Debes seleccionar un cliente', 'error');
    if(branchOffice == null|| cart.length == 0)Swal.fire('', 'Debes agregar productos al carrito', 'error');

    const order = {
      "branchOfficeId": branchOffice.id,
      "customerId": customer.id,
      "paymentMethodId": 1,
      "outputs": cart.map((output: OutputModel) => ({
        productId: output.product.id,
        quantity: output.quantity,
        price: output.product.price,
        discount: output.discount || 0.0, // Si no se proporciona un descuento, se establece en 0.0
        typeDiscount: output.typeDiscount || "monto" // Si no se proporciona un tipo de descuento, se establece en "monto"
      })) as Output[] 
    };
    postCreateOrder(order);
  }

  return (
    <>
      <Stack
        sx={{ px: 2 }}
        direction="column"
      >
        <Typography variant="h6">Carrito de orden</Typography>
        {branchOffice && <Typography variant="h6">{`${branchOffice.name}`}</Typography>}

        <div style={{ height: `${screenHeight / 1.5}px`, overflowY: 'auto' }}>
          {
            cart.map((output:OutputModel) => (
              <CardCart
                key={`${output.product.id}-${output.product.branchOfficeId}`}
                output={output}
                addItem={()=>addCard(output)}
                removeItem={()=>removeCard(output)}
                />
            ))
          }
        </div>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ py: 1 }}>
          <Typography> Total a pagar: </Typography>
          <Typography> {`${total} Bs.`} </Typography>
        </Stack>
        <DetailCart />
        <ComponentButton
          text="CREAR ORDEN"
          onClick={() => createOrder()}
          disable={validate} />
      </Stack>
    </>
  )
}
