import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setPermissions } from '@/store';

export const usePermissionStore = () => {
    const { permissions } = useSelector((state: any) => state.permissions);
    const dispatch = useDispatch();

    const getPermissions = async () => {
        console.log('OBTENIENDO PERMISOS')
        const { data } = await coffeApi.get('/permission');
        console.log(data)
        dispatch(setPermissions({ permissions: data.permissions }));
    }

    return {
        //* Propiedades
        permissions,
        //* Métodos
        getPermissions,
    }
}