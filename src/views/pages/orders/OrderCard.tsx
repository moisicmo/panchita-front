import { ComponentButton } from '@/components';
import { Card, CardContent, Stack, Typography } from '@mui/material';

interface cardProps {
  title: string;
  children: any;
  sx: any;
  value: any;
}

export const OrderCard = (props: cardProps) => {
  const {
    title,
    sx,
    value,
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
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <ComponentButton
          text="Entregar"
          onClick={() => {}}/>
        </Stack>
      </CardContent>
    </Card>
  );
};