import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setMeasurementUnits, setAddMeasurementUnit, setUpdateMeasurementUnit, setDeleteMeasurementUnit } from '@/store';
import Swal from 'sweetalert2';

export const useMeasurementUnitStore = () => {
  const { measurementUnits, } = useSelector((state: any) => state.measurementUnits);
  const dispatch = useDispatch();

  const getMeasurementUnits = async () => {
    const { data } = await coffeApi.get('/measurementUnit');
    console.log(data)
    dispatch(setMeasurementUnits({ measurementUnits: data.measurementUnits }));
  }
  const postCreateMeasurementUnit = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/measurementUnit/', body);
      console.log(data)
      dispatch(setAddMeasurementUnit({ measurementUnit: data.measurementUnit }));
      Swal.fire('Unidad de medida creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  const putUpdateMeasurementUnit = async (id: string, body: object) => {
    try {
      const { data } = await coffeApi.put(`/measurementUnit/${id}`, body);
      console.log(data)
      dispatch(setUpdateMeasurementUnit({ measurementUnit: data.measurementUnit }));
      Swal.fire('Unidad de medida editado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const deleteMeasurementUnit = async (id: string) => {
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
          const { data } = await coffeApi.delete(`/measurementUnit/${id}`);
          console.log(data)
          dispatch(setDeleteMeasurementUnit({ id }));
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
    measurementUnits,
    //* Métodos
    getMeasurementUnits,
    postCreateMeasurementUnit,
    putUpdateMeasurementUnit,
    deleteMeasurementUnit,
  }
}