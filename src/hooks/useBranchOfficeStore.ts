import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddbranchOffice, setDeletebranchOffice, setUpdatebranchOffice, setbranchOffices } from '@/store';
import Swal from 'sweetalert2';

export const useBranchOfficeStore = () => {
  const { branchOffices } = useSelector((state: any) => state.branchOffices);
  const dispatch = useDispatch();

  const getBranchOffices = async () => {
    console.log('OBTENIENDO TODOS LOS TIPOS DE CLIENTES')
    const { data } = await coffeApi.get(`/branchOffice`)
    console.log(data)
    dispatch(setbranchOffices({ branchOffices: data.branchOffices }));
  }

  const postCreateBranchOffice = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/branchOffice/', body);
      console.log(data)
      dispatch(setAddbranchOffice({ branchOffice: data.branchOffice }));
      Swal.fire('Sucursal creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  const putUpdateBranchOffice = async (id: string, body: object) => {
    try {
      const { data } = await coffeApi.put(`/branchOffice/${id}`, body);
      console.log(data)
      dispatch(setUpdatebranchOffice({ branchOffice: data.branchOffice }));
      Swal.fire('Sucursal editado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  const deleteBranchOffice = async (id: string) => {
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
          const { data } = await coffeApi.delete(`/branchOffice/${id}`);
          dispatch(setDeletebranchOffice({ id }));
          console.log(data)
          Swal.fire(
            'Eliminado',
            'Sucursal eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'El sucursal esta a salvo :)',
            'error'
          )
        }
      }).catch((error) => {
        console.log(error)
        Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
      });
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  return {
    //* Propiedades
    branchOffices,
    //* Métodos
    getBranchOffices,
    postCreateBranchOffice,
    putUpdateBranchOffice,
    deleteBranchOffice,
  }
}