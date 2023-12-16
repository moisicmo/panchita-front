import { SeverityPill } from '@/components';
import { useProductStatusStore } from '@/hooks';
import { ProductModel, ProductStatusModel } from '@/models';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Checkbox, IconButton, Stack, Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'


interface tableProps {
    product: ProductModel;
    stateSelect?: boolean;
    itemSelect?: (productStatus: ProductStatusModel) => void;
    handleEdit?: (productStatus: ProductStatusModel) => void;
    items?: any[];
}

export const ProductStatusTable = (props: tableProps) => {
    const {
        product,
        stateSelect = false,
        itemSelect,
        handleEdit,
        items = [],
    } = props;
    const { deleteProductStatus } = useProductStatusStore();
    return (
        <Table size="small" aria-label="purchases">
            <TableHead>
                <TableRow>
                    {stateSelect && <TableCell />}
                    <TableCell>Estado</TableCell>
                    <TableCell>Precio referencia</TableCell>
                    <TableCell>Descuento</TableCell>
                    <TableCell>Tipo Descuento</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {product.productStatus.map((productStatus) => {
                    const isSelected = items.includes(productStatus.id);
                    return (
                        <TableRow key={productStatus.id}>
                            {
                                stateSelect && <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isSelected}
                                        onChange={() => itemSelect!(productStatus)}
                                    />
                                </TableCell>
                            }
                            <TableCell component="th" scope="row">
                                {productStatus.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {productStatus.price}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {productStatus.discount}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {productStatus.typeDiscount}
                            </TableCell>
                            <TableCell>
                                <SeverityPill color={productStatus.state ? 'success' : 'error'}>
                                    {productStatus.state ? 'Activo' : 'Inactivo'}
                                </SeverityPill>
                            </TableCell>
                            <TableCell>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <IconButton
                                        onClick={() => handleEdit!(productStatus)}
                                    >
                                        <EditOutlined color="info" />
                                    </IconButton>
                                    <Switch
                                        checked={productStatus.state}
                                        onChange={() => deleteProductStatus(productStatus.id)}
                                        color="success"
                                        size="small"
                                    />
                                    <IconButton
                                        onClick={() => deleteProductStatus(productStatus.id)}
                                    >
                                        <DeleteOutline color="error" />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
