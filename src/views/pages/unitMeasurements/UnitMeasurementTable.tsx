import { ComponentButton, ComponentSearch, ComponentTablePagination } from "@/components";
import { useUnitMeasurementStore } from '@/hooks';
import { UnitMeasurementModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CreateUnitMeasurement } from ".";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

interface tableProps {
  limitInit?: number;
  itemSelect?: (unitMeasurement: UnitMeasurementModel) => void;
  items?: any[];
}

export const UnitMeasurementTable = (props: tableProps) => {
  const {
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { unitMeasurements = [], getUnitMeasurements, deleteUnitMeasurement } = useUnitMeasurementStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [unitMeasurementList, setUnitMeasurement] = useState<UnitMeasurementModel[]>([]);
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<UnitMeasurementModel | null>(null);
  const [query, setQuery] = useState<string>('');
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);


  useEffect(() => {
    getUnitMeasurements()
  }, []);

  useEffect(() => {
    const filtered = unitMeasurements.filter((e: UnitMeasurementModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : unitMeasurements,
      page,
      rowsPerPage
    );
    setUnitMeasurement(newList)
  }, [unitMeasurements, page, rowsPerPage, query])


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
            {unitMeasurementList.map((unitMeasurement: UnitMeasurementModel) => {
              const isSelected = items.includes(unitMeasurement.id);
              return (
                <TableRow key={unitMeasurement.id} >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => itemSelect!(unitMeasurement)}
                    />
                  </TableCell>
                  <TableCell>{unitMeasurement.name}</TableCell>
                  <TableCell align="right">
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      <IconButton onClick={() => {
                        setItemEdit(unitMeasurement);
                        handleDialog(true);
                      }} >
                        <EditOutlined color="info" />
                      </IconButton>
                      <IconButton onClick={() => deleteUnitMeasurement(unitMeasurement.id)} >
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
        total={unitMeasurements.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
      {
        openDialog &&
        <CreateUnitMeasurement
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
    </>
  );
}
