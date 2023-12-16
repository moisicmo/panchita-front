import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddRole, setDeleteRole, setRoles, setUpdateRole } from '@/store';
import Swal from 'sweetalert2';

export const useRoleStore = () => {
  const { roles } = useSelector((state: any) => state.roles);
  const dispatch = useDispatch();

  const getRoles = async () => {
    console.log('OBTENIENDO ROLES')
    const { data } = await coffeApi.get('/role');
    console.log(data)
    dispatch(setRoles({ roles: data.roles }));
  }

  const postCreateRole = async (body: object) => {
    try {
      const { data } = await coffeApi.post(`/role`, body);
      dispatch(setAddRole({ role: data.role }));
      Swal.fire('Rol creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  const putUpdateRole = async (id: number, body: object) => {
    try {
      console.log(body)
      const { data } = await coffeApi.put(`/role/${id}`, body);
      dispatch(setUpdateRole({ role: data.role }));
      Swal.fire('Rol editado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  const deleteRole = async (id: number) => {
    try {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: '¡No, cancelar!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await coffeApi.delete(`/role/${id}`);
          console.log(data)
          dispatch(setDeleteRole({ id }));
          Swal.fire(
            'Eliminado',
            'Rol eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'El rol esta a salvo :)',
            'error'
          )
        }
      }).catch((error) => {
        console.log(error)
        Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
      });
    } catch (error: any) {
      console.log(error)
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  return {
    //* Propiedades
    roles,
    //* Métodos
    getRoles,
    postCreateRole,
    putUpdateRole,
    deleteRole,

  }
}