import { ComponentTablePagination } from "@/components";
import { useTypeDocumentStore } from '@/hooks';
import { TypeDocumentModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (customer: TypeDocumentModel) => void;
    items?: any[];
}

export const TypeDocumentTable = (props: tableProps) => {
    const {
        stateSelect = false,
        itemSelect,
        limitInit = 10,
        items = [],
    } = props;

    const { typeDocuments = [], getTypeDocuments } = useTypeDocumentStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [typeDocumentlist, setTypeDocumentList] = useState<TypeDocumentModel[]>([]);



    useEffect(() => {
        getTypeDocuments()
    }, []);

    useEffect(() => {
        const defaultPermisionsList = applyPagination(
            typeDocuments,
            page,
            rowsPerPage
        );
        setTypeDocumentList(defaultPermisionsList)
    }, [typeDocuments, page, rowsPerPage])


    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                            {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {typeDocumentlist.map((typeDocument: TypeDocumentModel) => {
                            const isSelected = items.includes(typeDocument.id);
                            return (
                                <TableRow key={typeDocument.id} >
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => itemSelect!(typeDocument)}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{typeDocument.name}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <ComponentTablePagination
                total={typeDocuments.length}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setRowsPerPage(value)}
                page={page}
                limit={rowsPerPage}
            />
        </Stack>
    );
}
