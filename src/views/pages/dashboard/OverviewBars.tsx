import {
  Button,
  Card,
  CardContent,
  CardHeader,
  SvgIcon,
} from '@mui/material';
import { RefreshOutlined } from '@mui/icons-material';
import { Chart } from '@/components';

interface cardProps {
  months: String[];
  salesCount: number[];
  title:String;
}

export const OverviewBars = (props:cardProps) => {
  const {
    months,
    salesCount,
    title,
  } = props;
  return (
    <Card>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <RefreshOutlined />
              </SvgIcon>
            )}
          >
            Actualizar
          </Button>
        )}
        title={title}
      />
      <CardContent>
        <Chart
          height={350}
          options={{
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: months
            }
          }}
          series={[
            {
              name: "ventas",
              data: salesCount
            }
          ]}
          type="line"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};
