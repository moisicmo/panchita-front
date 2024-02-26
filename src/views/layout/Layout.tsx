import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { SideNav, TopNav } from '.';
import { CartDrawer } from './CartDrawer';
import { CartView } from '../pages/cart';

const SIDE_NAV_WIDTH = 220;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('md')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const Layout = ({ children }: { children: any }) => {
  const { pathname } = useLocation();
  const [openNav, setOpenNav] = useState(false);
  const [badgeOpen, setBadgeOpen] = useState(false)
  const handlePathnameChange = useCallback(
    () => {

      if (badgeOpen) setBadgeOpen(false)
      if (openNav) setOpenNav(false)
    },
    [openNav, badgeOpen]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    [pathname]
  );

  return (
    <>
      <TopNav
        onNavOpen={() => setOpenNav(true)}
        onTapBadge={() => setBadgeOpen(true)}
      />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <CartDrawer
        onClose={() => { setBadgeOpen(false) }}
        open={badgeOpen}>
          <CartView/>
        </CartDrawer>
      <LayoutRoot>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};
