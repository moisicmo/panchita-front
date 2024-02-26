
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MenuOutlined, ShoppingCart } from '@mui/icons-material';
// import { useSelector } from 'react-redux';
import { useCartStore, usePopover } from '@/hooks';
import { AccountPopover } from '.';
import noimage from '@/assets/images/profile.png';

const SIDE_NAV_WIDTH = 200;
const TOP_NAV_HEIGHT = 50;

export const TopNav = (({ onNavOpen, onTapBadge }: { onNavOpen: any, onTapBadge: any }) => {

  // const { data } = useSelector((state: any) => state.auth);
  const { cart = [] } = useCartStore();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('md'));

  const accountPopover = usePopover();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: () => 'transparent',
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <MenuOutlined color="primary" />
              </IconButton>
            )}
          </Stack>
          <Stack
            alignItems="center"
            spacing={2} direction="row"
          >
            <IconButton onClick={()=>onTapBadge()} aria-label="cart" >
              <Badge
                badgeContent={cart.length}
                color="primary"
                overlap="circular"
                sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 15, minWidth: 15 } }}
              >
                <ShoppingCart/>
              </Badge>
            </IconButton>

            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{ cursor: 'pointer', width: 45, height: 45 }}
              src={noimage}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
        onTapSettings={() => {
          accountPopover.handleClose();
        }}
      />
    </>
  );
});