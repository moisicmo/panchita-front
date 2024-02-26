import { useDispatch, useSelector } from 'react-redux';
import { setClearCart ,setAddCart, setRemoveCart, setCustomerCart } from '@/store';
import { BranchOfficeModel, CustomerModel, OutputModel } from '@/models';
import Swal from 'sweetalert2';


export const useCartStore = () => {
  const { cart , branchOffice, customer } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const addCard = async (itemCart: OutputModel, newBranchOffice?: BranchOfficeModel) => {
    if(cart.length>0){
      if(!newBranchOffice) return dispatch(setAddCart({ itemCart }));
      if(cart.find((e:OutputModel)=>e.product.branchOfficeId == newBranchOffice!.id)) {
        dispatch(setAddCart({ itemCart }));
      }else{
        Swal.fire({
          title: `Estas agregando un producto de la sucursal ${newBranchOffice?.name}`,
          text: `El carrito actual es de la sucursal ${branchOffice.name}, ¿Deseas limpiar el carrito para agregar el nuevo producto?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Sí, limipar!',
          cancelButtonText: '¡No, cancelar!',
      }).then(async (result) => {
          if (result.isConfirmed) {
            dispatch(setClearCart());
            dispatch(setAddCart({ itemCart, newBranchOffice }));
          }
      })
      }
    }else{
      dispatch(setAddCart({ itemCart, newBranchOffice }));
    }
  }

  const removeCard = async (itemCart: OutputModel) => {
    dispatch(setRemoveCart({ itemCart }));
  }

  const setCustomer = async (customer: CustomerModel|null) => {
    dispatch(setCustomerCart({ customer }));
  }

  return {
    //* Propiedades
    cart,
    branchOffice,
    customer,
    //* Métodos
    addCard,
    removeCard,
    setCustomer,
  }
}