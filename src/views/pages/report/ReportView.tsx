import { ComponentDateRange, ComponentSelect } from "@/components";
import { Download } from "@mui/icons-material";
import { Button, Grid, Stack, SvgIcon } from "@mui/material";
import { ReportTable } from ".";
import { useForm, useReportStore } from "@/hooks";
import { useCallback, useEffect, useState } from "react";

const formFields = {
  stageTypeIds: [],
}

export const ReportView = () => {

  const {
    stageTypeIds,
    onValueChange,
  } = useForm(formFields);
  // stage type
  const [dateRange, onChangeDateRange] = useState([]);
  const { reportData = [], getReport, getReportXlsx } = useReportStore();


  useEffect(() => {
    const where = (stageTypeIds.length > 0 || dateRange.length > 0) && {
      // ...(stageTypeIds.length > 0 && { nameStageType: stageTypeIds.map((stageType: StageTypeModel) => stageType.id) }),
      ...(dateRange.length > 0 && { dateTreatment: dateRange }),
    };

    getReport(where || {});
  }, [stageTypeIds, dateRange]);

  const getDocument = () => {
    const where = (stageTypeIds.length > 0 || dateRange.length > 0) && {
      // ...(stageTypeIds.length > 0 && { nameStageType: stageTypeIds.map((stageType: StageTypeModel) => stageType.id) }),
      ...(dateRange.length > 0 && { dateTreatment: dateRange }),
    };
    getReportXlsx(where || {})
  }

  return (
    <>
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
