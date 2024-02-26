import { BranchOfficeModel } from "@/models";
import { Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { ComponentSelect, ModalSelectComponent } from "@/components";
import { BranchOfficeTable } from "../branchOffices";
import { ProductSaleTable } from ".";
import { useCartStore } from "@/hooks";

export const SalesView = () => {
  const [branchOffice, setBranchOffice] = useState<BranchOfficeModel | null>(null);
  const [modalBranchOffice, setModalBranchOffice] = useState(false);
  const { addCard, removeCard } = useCartStore();
  
  const handleModalBranchOffice = useCallback((value: boolean) => {
    setModalBranchOffice(value);
  }, []);
  return (
    <>
      {
        modalBranchOffice &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Sucursales:'
          opendrawer={modalBranchOffice}
          handleDrawer={handleModalBranchOffice}
        >
          <BranchOfficeTable
            limitInit={5}
            stateSelect={true}
            itemSelect={(v) => {
              if (branchOffice == null || branchOffice.id != v.id) {
                // onValueChange('categoryId', v)
                setBranchOffice(v);
                handleModalBranchOffice(false)
              }
            }}
            items={branchOffice == null ? [] : [branchOffice.id]}
          />
        </ModalSelectComponent>
      }
      <Typography variant="h6">Punto de venta</Typography>
      <ComponentSelect
        label={branchOffice != null ? 'Sucursal' : ''}
        title={branchOffice != null ? branchOffice.name : 'Sucursal'}
        onPressed={() => handleModalBranchOffice(true)}
      />
      {
        branchOffice != null && 
        <ProductSaleTable
          branchOffice={branchOffice}
          addItem={(product)=>addCard(product ,branchOffice)}
          removeItem={(product)=>removeCard(product)}
        />
      }
    </>
  )
}
