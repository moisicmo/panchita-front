import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';

import Swal from 'sweetalert2';
import { setAddProduct, setDeleteProduct, setProducts, setUpdateProduct } from '@/store';

export const useProductStore = () => {
    const { products } = useSelector((state: any) => state.products);
    const dispatch = useDispatch();

    const getProducts = async () => {
        const { data } = await coffeApi.get('/product/');
        console.log(data)
        dispatch(setProducts({ products: data.products }));
    }
    const postCrateProduct = async (body: object) => {
        try {
            const { data } = await coffeApi.post('/product', body);
            console.log(data)
            dispatch(setAddProduct({ product: data.product }));
            Swal.fire('Producto creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putUpdateProduct = async (id: string, body: object) => {
        try {
            const { data } = await coffeApi.put(`/product/${id}`, body);
            console.log(data)
            dispatch(setUpdateProduct({ product: data.product }));
            Swal.fire('Producto editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteProduct = async (id: string) => {
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
                    const { data } = await coffeApi.delete(`/product/${id}`);
                    console.log(data)
                    dispatch(setDeleteProduct({ id }));
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
        products,
        //* Métodos
        getProducts,
        postCrateProduct,
        putUpdateProduct,
        deleteProduct,
    }
}