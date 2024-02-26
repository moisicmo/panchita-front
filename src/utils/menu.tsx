import { Assessment, Group, Home } from "@mui/icons-material"

export const menu = () => {
  return [
    {
      path: "/dashboardView",
      title: "Inicio",
      icon: <Home />
    },
    {
      title: "Gestión de Inventario",
      permission: "show-rent",
      group: [
        {
          path: "/productsView",
          title: "Productos",
          icon: <Home />,
          permission: "show-halls"
        },
        {
          path: "/movementsView",
          title: "Movimientos",
          icon: <Home />,
          permission: "show-halls"
        },
        {
          path: "/orderView",
          title: "Ordenes y Ventas",
          icon: <Home />,
          permission: "show-halls"
        },
        {
          path: "/salesView",
          title: "Punto de venta",
          icon: <Home />,
          permission: "show-halls"
        },
      ]
    },
    {
      title: "Gestión de Clientes",
      permission: "show-rent",
      group: [
        {
          path: "/customersView",
          title: "Clientes",
          icon: <Group />,
          permission: "show-halls"
        },
        {
          path: "/customerCreditsView",
          title: "Creditos",
          icon: <Group />,
          permission: "show-halls"
        },
      ]
    },
    {
      title: "Gestión de Usuarios",
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
          icon: <Home />,
          permission: "show-halls"
        },
        {
          path: "/rolesView",
          title: "Roles",
          icon: <Group />,
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