import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddCustomer, setCustomers, setDeleteCustomer, setUpdateCustomer } from '@/store';
import Swal from 'sweetalert2';

export const useCustomerStore = () => {
    const { customers } = useSelector((state: any) => state.customers);
    const dispatch = useDispatch();

    const getCustomers = async () => {
        const { data } = await coffeApi.get('/customer');
        console.log(data)
        dispatch(setCustomers({ customers: data.customers }))
    }
    const postCreateCustomer = async (body: object) => {
        try {
            const { data } = await coffeApi.post('/customer/', body);
            console.log(data)
            dispatch(setAddCustomer({ customer: data.customer }));
            Swal.fire('Cliente creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const putUpdateCustomer = async (id: string, body: object) => {
        try {
            const { data } = await coffeApi.put(`/customer/${id}`, body);
            console.log(data)
            dispatch(setUpdateCustomer({ customer: data.customer }));
            Swal.fire('Cliente editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteCustomer = async (id: string) => {
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
                    const { data } = await coffeApi.delete(`/customer/${id}`);
                    console.log(data)
                    dispatch(setDeleteCustomer({ id }));
                    Swal.fire(
                        'Eliminado',
                        'Cliente eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'El Cliente esta a salvo :)',
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
        customers,
        //* Métodos
        getCustomers,
        postCreateCustomer,
        putUpdateCustomer,
        deleteCustomer,
    }
}