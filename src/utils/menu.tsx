import { Assessment, Dashboard, Extension, Group, HistoryEdu, Home, LocalPolice, PointOfSale, Receipt, Storefront } from "@mui/icons-material"

export const menu = () => {
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
        {
          path: "/productsView",
          title: "Productos",
          icon: <Extension />,
          permission: "show-halls"
        },
        {
          path: "/movementsView",
          title: "Movimientos",
          icon: <HistoryEdu />,
          permission: "show-halls"
        },
        {
          path: "/salesView",
          title: "Ordenes y ventas",
          icon: <Receipt />,
          permission: "show-halls"
        },
        {
          path: "/ordersView",
          title: "Entregas",
          icon: <Home />,
          permission: "show-halls"
        },
        {
          path: "/pointSalesView",
          title: "Punto de venta",
          icon: <PointOfSale />,
          permission: "show-halls"
        },
      ]
    },
    {
      title: "Clientes",
      permission: "show-rent",
      group: [
        {
          path: "/customersView",
          title: "Clientes",
          icon: <Group />,
          permission: "show-halls"
        },
        // {
        //   path: "/customerCreditsView",
        //   title: "Creditos",
        //   icon: <Group />,
        //   permission: "show-halls"
        // },
      ]
    },
    {
      title: "Staff",
      permission: "show-rent",
      group: [
        {
          path: "/usersView",
          title: "Usuarios",
          icon: <Group />,
          permission: "show-halls"
        },
        {
          path: "/BranchOfficesView",
          title: "Sucursales",
          icon: <Storefront />,
          permission: "show-halls"
        },
        {
          path: "/rolesView",
          title: "Roles",
          icon: <LocalPolice />,
          permission: "show-halls"
        },
        {
          path: "/permissionsView",
          title: "Permisos",
          icon: <Group />,
          permission: "show-halls"
        },
      ]
    },
    {
      title: "Reportes",
      permission: "show-rent",
      group: [
        {
          path: "/ReportView",
          title: "Reportes",
          icon: <Assessment />,
          permission: "show-halls"
        }
      ]
    },
  ]
}