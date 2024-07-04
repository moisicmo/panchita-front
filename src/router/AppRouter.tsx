import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { Layout } from '@/views/layout';
/* Rutas */
import { AuthPage } from '@/views/auth/AuthPage';
import { DashboardView } from '@/views/pages/dashboard';
import { BranchOfficesView } from '@/views/pages/branchOffices';
import { PermissionsView } from '@/views/pages/permisions';
import { RolesView } from '@/views/pages/roles';
import { UsersView } from '@/views/pages/staffs';
import { CustomersView } from '@/views/pages/customers';
import { ProductsView } from '@/views/pages/products';
import { MovementsView } from '@/views/pages/movements';
import { PointOfSaleView } from '@/views/pages/pointOfSale';
import { SaleView } from '@/views/pages/sales';
import { ReportView } from '@/views/pages/report';
import { OrderView } from '@/views/pages/orders';
import { PermissionModel } from '@/models';

export const AppRouter = () => {

  const { roleUser } = useAuthStore();
  const { status, checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    (status === 'not-authenticated') ?
      <AuthPage />
      :
      <Layout>
        <Routes>
          <Route path='/dashboardView' element={<DashboardView />} />
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar sucursales") &&
            <Route path='/BranchOfficesView' element={<BranchOfficesView />} />
          }
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar permisos") &&
            <Route path='/permissionsView' element={<PermissionsView />} />
          }
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar roles") &&
            <Route path='/rolesView' element={<RolesView />} />
          }
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar administradores") &&
            <Route path='/usersView' element={<UsersView />} />
          }
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar clientes") &&
            <Route path='/customersView' element={<CustomersView />} />
          }
          {/* {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar sucursales") &&
            <Route path='/customerCreditsView' element={<CustomerCreditsView />} />
          } */}
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar productos") &&
            <Route path='/productsView' element={<ProductsView />} />
          }
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar movimientos") &&
            <Route path='/movementsView' element={<MovementsView />} />
          }
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar ordenes y ventas") &&
            <Route path='/salesView' element={<SaleView />} />
          }
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar entregas") &&
            <Route path='/ordersView' element={<OrderView />} />
          }
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver punto de venta") &&
            <Route path='/pointSalesView' element={<PointOfSaleView />} />
          }
          {
            roleUser.permissions.find((permission: PermissionModel) => permission.name === "generar reportes") &&
            <Route path='/reportView' element={<ReportView />} />
          }

          {/*  */}
          <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
        </Routes>
      </Layout>
  )
}
