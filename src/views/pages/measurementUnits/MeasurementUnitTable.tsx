import { ComponentButton, ComponentSearch, ComponentTablePagination } from "@/components";
import { useMeasurementUnitStore } from '@/hooks';
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CreateMeasurementUnit } from ".";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { MeasurementUnitModel } from "@/models";

interface tableProps {
  limitInit?: number;
  itemSelect?: (measurementUnit: MeasurementUnitModel) => void;
  items?: any[];
}

export const MeasurementUnitTable = (props: tableProps) => {
  const {
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { measurementUnits = [], getMeasurementUnits, deleteMeasurementUnit } = useMeasurementUnitStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [measurementUnitList, setMeasurementUnit] = useState<MeasurementUnitModel[]>([]);
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<MeasurementUnitModel | null>(null);
  const [query, setQuery] = useState<string>('');
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);


  useEffect(() => {
    getMeasurementUnits()
  }, []);

  useEffect(() => {
    const filtered = measurementUnits.filter((e: MeasurementUnitModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : measurementUnits,
      page,
      rowsPerPage
    );
    setMeasurementUnit(newList)
  }, [measurementUnits, page, rowsPerPage, query])


  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <ComponentSearch
          title="Buscar unidad de medida"
          search={setQuery}
        />
        <ComponentButton
          text="Crear Unidad de medida"
          onClick={() => handleDialog(true)}
        />
      </Stack>

      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell />
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {measurementUnitList.map((measurementUnit: MeasurementUnitModel) => {
              const isSelected = items.includes(measurementUnit.id);
              return (
                <TableRow key={measurementUnit.id} >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => itemSelect!(measurementUnit)}
                    />
                  </TableCell>
                  <TableCell>{measurementUnit.name}</TableCell>
                  <TableCell align="right">
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      <IconButton onClick={() => {
                        setItemEdit(measurementUnit);
                        handleDialog(true);
                      }} >
                        <EditOutlined color="info" />
                      </IconButton>
                      <IconButton onClick={() => deleteMeasurementUnit(measurementUnit.id)} >
                        <DeleteOutline color="error" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={measurementUnits.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
      {
        openDialog &&
        <CreateMeasurementUnit
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
    </>
  );
}
