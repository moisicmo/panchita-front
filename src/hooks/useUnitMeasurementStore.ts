import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddUnitMeasurement, setDeleteUnitMeasurement, setUnitMeasurements, setUpdateUnitMeasurement } from '@/store';
import Swal from 'sweetalert2';

export const useUnitMeasurementStore = () => {
  const { unitMeasurements } = useSelector((state: any) => state.unitMeasurements);
  const dispatch = useDispatch();

  const getUnitMeasurements = async () => {
    const { data } = await coffeApi.get('/measurementUnit/');
    console.log(data)
    dispatch(setUnitMeasurements({ measurementUnits: data.measurementUnits }));
  }
  const postCreateUnitMeasurement = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/measurementUnit/', body);
      console.log(data)
      dispatch(setAddUnitMeasurement({ unitMeasurement: data.unitMeasurement }));
      Swal.fire('Unidad de medida creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  const putUpdateUnitMeasurement = async (id: string, body: object) => {
    try {
      const { data } = await coffeApi.put(`/unitMeasurement/${id}`, body);
      console.log(data)
      dispatch(setUpdateUnitMeasurement({ unitMeasurement: data.unitMeasurement }));
      Swal.fire('Unidad de medida editado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const deleteUnitMeasurement = async (id: string) => {
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
          const { data } = await coffeApi.delete(`/unitMeasurement/${id}`);
          console.log(data)
          dispatch(setDeleteUnitMeasurement({ id }));
          Swal.fire(
            'Eliminado',
            'Unidad de medida eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'La Unidad de medida esta a salvo :)',
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
    unitMeasurements,
    //* Métodos
    getUnitMeasurements,
    postCreateUnitMeasurement,
    putUpdateUnitMeasurement,
    deleteUnitMeasurement,
  }
}