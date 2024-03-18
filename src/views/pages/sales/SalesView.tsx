import { BranchOfficeModel } from "@/models";
import { Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ComponentSelect, ModalSelectComponent } from "@/components";
import { BranchOfficeTable } from "../branchOffices";
import { ProductSaleTable } from ".";
import { useBranchOfficeStore, useCartStore } from "@/hooks";

export const SalesView = () => {
  const { branchOffices = [], getBranchOffices } = useBranchOfficeStore();
  const [branchOffice, setBranchOffice] = useState<BranchOfficeModel | null>(null);
  const [modalBranchOffice, setModalBranchOffice] = useState(false);
  const { addCard, removeCard } = useCartStore();
  
  const handleModalBranchOffice = useCallback((value: boolean) => {
    setModalBranchOffice(value);
  }, []);

  useEffect(() => {
    getBranchOffices();
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
        branchOffices.length == 1 && 
        <ProductSaleTable
          branchOffice={branchOffices.length == 1?  branchOffices[0]: branchOffice}
          addItem={(product)=>addCard(product ,branchOffices.length == 1?  branchOffices[0]: branchOffice)}
          removeItem={(product)=>removeCard(product)}
        />
      }
    </>
  )
}
