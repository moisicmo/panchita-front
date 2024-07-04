import { ComponentButton } from '@/components';
import { useAuthStore, useOrderStore } from '@/hooks';
import { OrderModel, PermissionModel, RoleModel } from '@/models';
import { Card, CardContent, Stack, Typography } from '@mui/material';

interface cardProps {
  order: OrderModel;
  children: any;
  sx: any;
}

export const OrderCard = (props: cardProps) => {

  const { roleUser } = useAuthStore();
  const { dispatchOrder } = useOrderStore();

  const {
    order,
    sx,
  } = props;
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >

              {order.customer.user.name}
            </Typography>
            <Typography variant="h4">
              {`Pedido ${order.id}`}
            </Typography>
          </Stack>
          <ComponentButton
            text="Entregar"
            onClick={() => { dispatchOrder(order.id) }}
            disable={!(roleUser as RoleModel).permissions.find((permission: PermissionModel) => permission.name === "hacer entrega")} />
        </Stack>
      </CardContent>
    </Card>
  );
};