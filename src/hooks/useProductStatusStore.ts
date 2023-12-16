import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';

import Swal from 'sweetalert2';
import { setAddProductStatus, setDeleteProductStatus, setUpdateProductStatus } from '@/store';

export const useProductStatusStore = () => {
  const { products } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  const postCrateProductStatus = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/productStatus', body);
      console.log(data)
      dispatch(setAddProductStatus({ product: data.product }));
      Swal.fire('Producto creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  const putUpdateProductStatus = async (id: string, body: object) => {
    try {
      const { data } = await coffeApi.put(`/productStatus/${id}`, body);
      console.log(data)
      dispatch(setUpdateProductStatus({ product: data.product }));
      Swal.fire('Producto editado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const deleteProductStatus = async (id: string) => {
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
          const { data } = await coffeApi.delete(`/productStatus/${id}`);
          console.log(data)
          dispatch(setDeleteProductStatus({ product: data.product }));
          Swal.fire(
            'Eliminado',
            'El producto eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'El producto esta a salvo :)',
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
    products,
    //* Métodos
    postCrateProductStatus,
    putUpdateProductStatus,
    deleteProductStatus,
  }
}