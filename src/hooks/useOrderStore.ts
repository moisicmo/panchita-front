import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setClearAllCart, setDeleteOrder, setKardexProductSale, setOrders, setOrdersSold, setUpdateOrder } from '@/store';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import printJS from 'print-js';


export const useOrderStore = () => {
  const { orders, ordersSold } = useSelector((state: any) => state.orders);
  const dispatch = useDispatch();

  const getOrdersSold = async () => {
    console.log('OBTENIENDO ORDENES VENDIDOS')
    const { data } = await coffeApi.get('/sale');
    console.log(data)
    dispatch(setOrdersSold({ ordersSold: data.sales }));
  }
  const getOrders = async (branchOfficeId: number) => {
    console.log('OBTENIENDO ORDENES')
    const { data } = await coffeApi.get(`/order/${branchOfficeId}`);
    console.log(data)
    dispatch(setOrders({ orders: data.orders }));
  }
  const postCreateOrder = async (body: object) => {
    try {
      console.log('GENERANDO UNA ORDEN')
      console.log(body)
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¿Deseas crear está orden?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, crear!',
        cancelButtonText: '¡No, cancelar!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await coffeApi.post('/order', body);
          console.log(data);
          Swal.fire(
            'ORDEN',
            'La orden se realizo correctamente :)',
            'success'
          )
          dispatch(setKardexProductSale({ kardexProductsSale: data.products }));
          dispatch(setClearAllCart());
          const byteCharacters = atob(data.document);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          const pdfURL = window.URL.createObjectURL(blob)
          printJS(pdfURL)
          
        }
      });
    } catch (error: any) {
      Swal.fire('Oops ocurrió algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const putUpdateOrderSold = async (id: number) => {
    try {
      Swal.fire({
        title: 'Genial, desesa confirmar esta venta!',
        text: "¡No podras revertir una venta!",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, quiero vender!',
        cancelButtonText: 'No, aun no',
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log('VENDIENDO UNA ORDEN')
          const { data } = await coffeApi.post(`/sale/${id}`);
          dispatch(setDeleteOrder({ id }));
          const byteCharacters = atob(data.document);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          const pdfURL = window.URL.createObjectURL(blob)
          printJS(pdfURL)
          Swal.fire(
            'VENTA HECHA',
            'La venta se genero correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'Aún la conservamos en una orden :)',
            'success'
          )
        }
      });

    } catch (error: any) {
      Swal.fire('Oops ocurrió algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const putUpdateOrder = async (id: number, body: object) => {
    try {
      console.log('EDITANDO UNA ORDEN')
      console.log(body)
      // const { data } = await coffeApi.put(`/order/${id}`, body);
      // dispatch(setUpdateOrder({ order: data.order }))
      // Swal.fire({
      //   title: 'Genial, orden Modificado!',
      //   text: "¿Deseas descargar la PROFORMA DE ORDEN?",
      //   icon: 'success',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: '¡Sí, quiero la Proforma!',
      //   cancelButtonText: 'No, esta bien asi',
      // }).then(async (result) => {
      //   if (result.isConfirmed) {
      //     const byteCharacters = atob(data.document);
      //     const byteNumbers = new Array(byteCharacters.length);
      //     for (let i = 0; i < byteCharacters.length; i++) {
      //       byteNumbers[i] = byteCharacters.charCodeAt(i);
      //     }
      //     const byteArray = new Uint8Array(byteNumbers);
      //     const blob = new Blob([byteArray], { type: 'application/pdf' });
      //     saveAs(blob, data.fileName);

      //     // if (Object.keys(body).length === 0) return;
      //     // Swal.fire('Reporte generado correctamente', '', 'success');
      //     Swal.fire(
      //       'ORDEN Y PROFORMA',
      //       'La orden y el documento se modificaron correctamente',
      //       'success'
      //     )
      //   } else {
      //     Swal.fire(
      //       'ORDEN',
      //       'La orden se modifico correctamente :)',
      //       'success'
      //     )
      //   }
      // });
    } catch (error: any) {
      Swal.fire('Oops ocurrió algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const deleteOrder = async (id: number) => {
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
          const { data } = await coffeApi.delete(`/order/${id}`);
          console.log(data)
          dispatch(setDeleteOrder({ id }));
          Swal.fire(
            'Eliminado',
            'Orden eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'La orden esta a salvo :)',
            'error'
          )
        }
      });
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const getDocumentOrder = async (id: number) => {
    try {
      const { data } = await coffeApi.get(`order/document/${id}`);
      const byteCharacters = atob(data.document);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      const pdfURL = window.URL.createObjectURL(blob)
      printJS(pdfURL)

    } catch (error: any) {
      Swal.fire('Oops ocurrió algo', error.response.data.errors[0].msg, 'error');
    }
  }
  return {
    //* Propiedades
    orders,
    ordersSold,
    //* Métodos
    getOrdersSold,
    getOrders,
    postCreateOrder,
    putUpdateOrderSold,
    putUpdateOrder,
    deleteOrder,
    getDocumentOrder,
  }
}