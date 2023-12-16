import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddKardexProduct, setKardexProduct } from '@/store';
import Swal from 'sweetalert2';

export const useKardexProductStore = () => {
  const { kardexProducts } = useSelector((state: any) => state.kardexProducts);
  const dispatch = useDispatch();

  const getAllKardexProducts = async () => {
    const { data } = await coffeApi.get('/kardexProduct/');
    console.log(data)
    dispatch(setKardexProduct({ kardexProducts: data.kardexProducts }));
  }
  const getKardexProductByProduct = async (id: string) => {
    const { data } = await coffeApi.get(`/kardexProduct/${id}`);
    console.log(data)
    dispatch(setKardexProduct({ kardexProducts: data.kardexProducts }));
  }

  const postCreateInputProduct = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/input/', body);
      console.log(data)
      dispatch(setAddKardexProduct({ kardexProduct: data.input }));
      Swal.fire('Recepción creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }



  return {
    //* Propiedades
    kardexProducts,
    //* Métodos
    getAllKardexProducts,
    getKardexProductByProduct,
    postCreateInputProduct,
  }
}