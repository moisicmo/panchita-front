import { Stack, Typography } from "@mui/material"
import { PermissionTable } from "."

export const PermissionsView = () => {

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Typography variant="h6">Permisos</Typography>
            </Stack>
            <PermissionTable />
        </>
    )
}
