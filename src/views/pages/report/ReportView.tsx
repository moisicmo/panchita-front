import { ComponentDateRange, ComponentSelect, ModalSelectComponent } from "@/components";
import { Download } from "@mui/icons-material";
import { Button, Grid, Stack, SvgIcon } from "@mui/material";
import { ReportTable } from ".";
import { useForm, useReportStore } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import { BranchOfficeTable } from "../branchOffices";
import { BranchOfficeModel } from "@/models";

const formFields = {
  branchOfficeIds: [],
}

export const ReportView = () => {

  const {
    branchOfficeIds,
    onValueChange,
  } = useForm(formFields);
  // stage type
  const [dateRange, onChangeDateRange] = useState([]);
  const { reportData = [], getReport, getReportXlsx } = useReportStore();


  useEffect(() => {
    const where = (branchOfficeIds.length > 0 || dateRange.length > 0) && {
      ...(branchOfficeIds.length > 0 && { branchOfficeId: branchOfficeIds.map((branchOffice: BranchOfficeModel) => branchOffice.id) }),
      ...(dateRange.length > 0 && { date: dateRange }),
    };

    getReport(where || {});
  }, [branchOfficeIds, dateRange]);

  const getDocument = () => {
    const where = (branchOfficeIds.length > 0 || dateRange.length > 0) && {
      ...(branchOfficeIds.length > 0 && { branchOfficeId: branchOfficeIds.map((branchOffice: BranchOfficeModel) => branchOffice.id) }),
      ...(dateRange.length > 0 && { date: dateRange }),
    };
    getReportXlsx(where || {})
  }
  const [modalWarehouse, setModalWarehouse] = useState(false);
  const handleModalWarehouse = useCallback((value: boolean) => {
    setModalWarehouse(value);
  }, []);

  return (
    <>
      {
        modalWarehouse &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title='Sucursales:'
          opendrawer={modalWarehouse}
          handleDrawer={handleModalWarehouse}
        >
          <BranchOfficeTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (branchOfficeIds.map((e: BranchOfficeModel) => e.id).includes(v.id)) {
                onValueChange('branchOfficeIds', [...branchOfficeIds.filter((e: BranchOfficeModel) => e.id != v.id)])
              } else {
                onValueChange('branchOfficeIds', [...branchOfficeIds, v])
              }
            }}
            items={branchOfficeIds.map((e: BranchOfficeModel) => (e.id))}
          />
        </ModalSelectComponent>
      }
      <Stack direction="row" justifyContent="end">
        <Button
          onClick={() => getDocument()}
          startIcon={<SvgIcon fontSize="small"><Download /></SvgIcon>}
          variant="contained"
          disabled={reportData.length == 0}
        >
          Descargar
        </Button>
      </Stack>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
          <ComponentSelect
            label={branchOfficeIds != null ? '' : 'Sucursales'}
            title={'Sucursales'}
            onPressed={() => handleModalWarehouse(true)}
            items={branchOfficeIds.map((e: BranchOfficeModel) => ({ id: e.id, name: e.name }))}
            onRemove={(v) => onValueChange('branchOfficeIds', [...branchOfficeIds.filter((e: BranchOfficeModel) => e.id != v)])}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
          <ComponentDateRange
            value={dateRange}
            onChange={onChangeDateRange}
          />
        </Grid>
      </Grid>
      <ReportTable />
    </>
  )
}
