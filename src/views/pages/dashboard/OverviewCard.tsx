import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

interface cardProps {
  title: string;
  children: any;
  sx: any;
  value: any;
}

export const OverviewCard = (props: cardProps) => {
  const {
    title,
    children,
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
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              {children}
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};