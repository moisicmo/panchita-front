import { ComponentButton } from "@/components"
import { OutputModel } from "@/models";
import { Add, Remove } from "@mui/icons-material"
import { Divider, Stack, SvgIcon, Typography } from "@mui/material"

interface cartProps {
  output:OutputModel;
  addItem: () => void;
  removeItem: () => void;
}
export const CardCart = (props: cartProps) => {
  const {
    output,
    addItem,
    removeItem,
  } = props;

  return (
    <Stack
      direction="column" >
      <Stack
        direction="row"
        alignItems="center"
        sx={{ p: 2 }} >
        <Stack
          direction="column"
          alignItems="center"
          flex={1}  >
          <ComponentButton
            variant="outlined"
            maxWidth="36px"
            minWidth="36px"
            onClick={() => addItem()}
            startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
          <Typography sx={{ px: 1 }} >{output.quantity}</Typography>
          <ComponentButton
            variant="outlined"
            maxWidth="36px"
            minWidth="36px"
            onClick={() => removeItem()}
            startIcon={<SvgIcon fontSize="small"><Remove /></SvgIcon>} />
        </Stack>
        <Stack
          direction="column"
          sx={{ px: 1 }}
          flex={5} >
          <Typography>
            {output.product.name}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between">
            <Typography>
              {`${output.product.price??output.price } Bs  x ${output.quantity} =`}
            </Typography>
            <Typography>
              {`${(output.product.price??output.price) * output.quantity} Bs.`}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider style={{ height: '1px', backgroundColor: 'red' }} />
    </Stack>
  )
}
