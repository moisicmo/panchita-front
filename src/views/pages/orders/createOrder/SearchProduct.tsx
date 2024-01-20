import { ComponentInput } from '@/components';
import { useForm, useKardexProductStore, useProductStore } from '@/hooks';
import { BranchOfficeModel, KardexProductModel, OutputModel, ProductModel } from '@/models';
import { Table, TableBody } from '@mui/material';
import { ProductsStoreView } from '.';

const formFields = {
  search: '',
}

interface searchProps {
  outputIds: OutputModel[];
  pushItem: (output: OutputModel) => void;
  branchOfficeId: BranchOfficeModel;
}

export const SearchProduct = (props: searchProps) => {
  const {
    outputIds,
    pushItem,
    branchOfficeId,
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
              if (kardexProduct.branchOffice.id == branchOfficeId.id) {
                return kardexProduct.product.id;
              }
            }).includes(product.id))
              .filter((product: ProductModel) => search !== "" && (
                (product.name.trim().toUpperCase().includes(search.trim().toUpperCase())) ||
                (product.code.trim().toUpperCase().includes(search.trim().toUpperCase()))
              ))
              .map((product: ProductModel) => {
                const newProduct = {
                  ...product,
                  productStatus: outputIds.map((output: OutputModel) => output.product.id).includes(product.id)
                };
                return !newProduct.productStatus && (
                  <ProductsStoreView
                    key={product.id}
                    product={product}
                    pushItem={pushItem} />
                )
              })
          }
        </TableBody>
      </Table>
    </>
  )
}