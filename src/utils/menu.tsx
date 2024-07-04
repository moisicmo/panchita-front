import { useAuthStore } from "@/hooks";
import { PermissionModel } from "@/models";
import { Assessment, Dashboard, Extension, Group, HistoryEdu, Home, LocalPolice, PointOfSale, Receipt, Storefront } from "@mui/icons-material"

export const menu = () => {
  const { roleUser } = useAuthStore();
  return [
    {
      path: "/dashboardView",
      title: "Inicio",
      icon: <Dashboard />
    },
    {
      title: "Inventario",
      permission: "show-rent",
      group: [
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar productos") &&
        {
          path: "/productsView",
          title: "Productos",
          icon: <Extension />,
          permission: "show-halls"
        }),
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar movimientos") &&
        {
          path: "/movementsView",
          title: "Movimientos",
          icon: <HistoryEdu />,
          permission: "show-halls"
        }),
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar ordenes y ventas") &&
        {
          path: "/salesView",
          title: "Ordenes y ventas",
          icon: <Receipt />,
          permission: "show-halls"
        }),
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar entregas") &&
        {
          path: "/ordersView",
          title: "Entregas",
          icon: <Home />,
          permission: "show-halls"
        }),
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver punto de venta") &&
        {
          path: "/pointSalesView",
          title: "Punto de venta",
          icon: <PointOfSale />,
          permission: "show-halls"
        }),
      ].filter(groupItem => groupItem !== undefined)
    },
    {
      title: "Clientes",
      permission: "show-rent",
      group: [
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar clientes") &&
        {
          path: "/customersView",
          title: "Clientes",
          icon: <Group />,
          permission: "show-halls"
        }),
        // {
        //   path: "/customerCreditsView",
        //   title: "Creditos",
        //   icon: <Group />,
        //   permission: "show-halls"
        // },
      ].filter(groupItem => groupItem !== undefined)
    },
    {
      title: "Staff",
      permission: "show-rent",
      group: [
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar administradores") &&
        {
          path: "/usersView",
          title: "Usuarios",
          icon: <Group />,
          permission: "show-halls"
        }),
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar sucursales") &&
        {
          path: "/BranchOfficesView",
          title: "Sucursales",
          icon: <Storefront />,
          permission: "show-halls"
        }),
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar roles") &&
        {
          path: "/rolesView",
          title: "Roles",
          icon: <LocalPolice />,
          permission: "show-halls"
        }),
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "listar permisos") &&
        {
          path: "/permissionsView",
          title: "Permisos",
          icon: <Group />,
          permission: "show-halls"
        }),
      ].filter(groupItem => groupItem !== undefined)
    },
    {
      title: "Reportes",
      permission: "show-rent",
      group: [
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "generar reportes") &&
        {
          path: "/ReportView",
          title: "Reportes",
          icon: <Assessment />,
          permission: "show-halls"
        }),
      ].filter(groupItem => groupItem !== undefined)
    },
  ]
}