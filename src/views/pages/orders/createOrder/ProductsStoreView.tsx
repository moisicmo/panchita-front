import { ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { OutputModel, ProductModel } from "@/models";
import { Button, TableCell, TableRow } from "@mui/material";

interface storeProps {
  product: ProductModel;
  pushItem: (output: OutputModel) => void;
}

const formFields = {
  quantity: ''
}

export const ProductsStoreView = (props: storeProps) => {
  const {
    product,
    pushItem,
  } = props;
  const { quantity, onInputChange } = useForm(formFields);

  const AddItem = () => {
    if (quantity === "") return;
    const output: OutputModel = {
      product: product,
      quantity: parseInt(quantity),
      price: product.price,
      discount: 0,
      typeDiscount: 'Monto',
    }
    pushItem(output);
  }
  return (
    <>
      <TableRow key={product.id} >
        <TableCell component="th">
          {product.name}
        </TableCell>
        <TableCell component="th" style={{ padding: 0 }}>
          <ComponentInput type="text" label="" name="quantity" value={quantity} onChange={(v: any) => onInputChange(v, false, true)} />
        </TableCell>
        <TableCell component="th">
          <Button
            onClick={() => AddItem()}
            style={{ padding: 0 }}
          >
            Agregar
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}