import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddstaff, setDeletestaff, setUpdatestaff, setstaffs } from '@/store';
import Swal from 'sweetalert2';

export const useStaffStore = () => {
  const { staffs } = useSelector((state: any) => state.staffs);
  const dispatch = useDispatch();

  const getStaffs = async () => {
    console.log('OBTENIENDO USUARIOS')
    const { data } = await coffeApi.get('/staff');
    console.log(data)
    dispatch(setstaffs({ staffs: data.staffs }));
  }

  const postCreateStaff = async (body: object) => {
    try {
      console.log('CREANDO USUARIO')
      console.log(body)
      const { data } = await coffeApi.post(`/staff/`, body);
      console.log(data)
      dispatch(setAddstaff({ staff: data.staff }));
      Swal.fire('Usuario creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  const putUpdateStaff = async (id: string, body: object) => {
    try {
      const { data } = await coffeApi.put(`/staff/${id}`, body);
      console.log(data)
      dispatch(setUpdatestaff({ staff: data.staff }));
      Swal.fire('Se modifico el usuario', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  const deleteStaff = async (id: string) => {
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
          const { data } = await coffeApi.delete(`/staff/${id}`);
          console.log(data)
          dispatch(setDeletestaff({ id }));
          Swal.fire(
            'Eliminado',
            'Usuario eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'Usuario esta a salvo :)',
            'error'
          )
        }
      });
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  return {
    //* Propiedades
    staffs,
    //* Métodos
    getStaffs,
    postCreateStaff,
    putUpdateStaff,
    deleteStaff,
  }
}