
import { useKardexProductStore } from "@/hooks";
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { KardexBranchOfficeModel } from "@/models";
import { KardexProductTable } from ".";

export const MovementTable = () => {

  const { kardexProducts = [], getAllKardexProducts } = useKardexProductStore();


  useEffect(() => {
    getAllKardexProducts()
  }, []);



  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Stack sx={{ paddingRight: '10px' }}>
      {
        kardexProducts.map((branchOffice: KardexBranchOfficeModel) => {
          return (
            <Accordion
              key={`${branchOffice.branchOffice.id}`}
              expanded={kardexProducts.length==1?true : expanded === `${branchOffice.branchOffice.id}`}
              onChange={handleChange(`${branchOffice.branchOffice.id}`)}
              defaultExpanded = {kardexProducts.length>0}
              >
              <AccordionSummary expandIcon={<ExpandMore />} >
                <Typography>{`${branchOffice.branchOffice.name}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <KardexProductTable kardexProductList= {branchOffice.branchOffice.products} />
              </AccordionDetails>
            </Accordion>)
        })
      }
    </Stack>
  );
}