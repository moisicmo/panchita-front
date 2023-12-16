import { ComponentInput } from '@/components';
import { useForm, useKardexProductStore, useProductStore } from '@/hooks';
import { KardexProductModel, OutputModel, ProductModel, ProductStatusModel, WarehouseModel } from '@/models';
import { Table, TableBody } from '@mui/material';
import { ProductsStoreView } from '.';

const formFields = {
  search: '',
}

interface searchProps {
  outputIds: OutputModel[];
  pushItem: (output: OutputModel) => void;
  warehouseId: WarehouseModel;
}

export const SerchProduct = (props: searchProps) => {
  const {
    outputIds,
    pushItem,
    warehouseId,
  } = props;

  const { search, onInputChange } = useForm(formFields);

  const { products = [] } = useProductStore();
  const { kardexProducts = [] } = useKardexProductStore();
  return (
    <>
      <ComponentInput
        type="text"
        label="Buscar Producto"
        name="search"
        value={search}
        onChange={(v: any) => onInputChange(v, true)}

      />
      <Table size="small" aria-label="a dense table">
        <TableBody>
          {
            products.filter((product: ProductModel) => kardexProducts.map((kardexProduct: KardexProductModel) => {
              if (kardexProduct.warehouseId.id == warehouseId.id) {
                return kardexProduct.inputOrOutput.productStatusId.productId.id;
              }
            }).includes(product.id))
              .map((product: ProductModel) => {
                return {
                  ...product,
                  productStatus: product.productStatus.filter((productStatus: ProductStatusModel) => kardexProducts.map((kardexProduct: KardexProductModel) => {
                    return kardexProduct.inputOrOutput.productStatusId.id;
                  }).includes(productStatus.id))
                }
              })
              .filter((product: ProductModel) => search !== "" && (
                (product.name.trim().toUpperCase().includes(search.trim().toUpperCase())) ||
                (product.code.trim().toUpperCase().includes(search.trim().toUpperCase()))
              ))
              .map((product: ProductModel) => {
                const newProduct = {
                  ...product,
                  productStatus: [...product.productStatus.filter((productStatus: ProductStatusModel) => !outputIds.map((output: OutputModel) => output.productStatusId.id).includes(productStatus.id))]
                };
                return newProduct.productStatus.length > 0 && (
                  <ProductsStoreView
                    key={newProduct.id}
                    product={newProduct}
                    pushItem={pushItem}
                    warehouseId={warehouseId} />
                )
              })
          }
        </TableBody>
      </Table>
    </>
  )
}
// filter((output: OutputModel) => cart.warehouseId === warehouseId.id)