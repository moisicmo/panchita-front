import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddKardexProduct, setKardexProduct, setKardexProductSale } from '@/store';
import Swal from 'sweetalert2';

export const useKardexProductStore = () => {
  const { kardexProducts,kardexProductsSale } = useSelector((state: any) => state.kardexProducts);
  const dispatch = useDispatch();

  const getAllKardexProducts = async () => {
    const { data } = await coffeApi.get('/kardex/');
    console.log(data)
    dispatch(setKardexProduct({ kardexProducts: data.kardex }));
  }

  const getKardexProductByProduct = async (id: string) => {
    const { data } = await coffeApi.get(`/kardex/${id}`);
    console.log(data)
    dispatch(setKardexProduct({ kardexProducts: data.kardex }));
  }



  const getProductsKardexByBranchOffice = async (branchOfficeId:number)=>{
    try {
      
      const { data } = await coffeApi.get(`/kardex/${branchOfficeId}`);
      console.log(data);
      dispatch(setKardexProductSale({ kardexProductsSale: data.products }));
    } catch (error) {
      console.log(error)
    }
  }

  const postCreateInputProduct = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/input/', body);
      console.log(data)
      dispatch(setAddKardexProduct({ kardexProduct: data.kardex }));
      Swal.fire('Recepción creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }



  return {
    //* Propiedades
    kardexProducts,
    kardexProductsSale,
    //* Métodos
    getAllKardexProducts,
    getKardexProductByProduct,
    getProductsKardexByBranchOffice,
    postCreateInputProduct,
  }
}