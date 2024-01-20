import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { coffeApi } from "@/services";
import { onLogin, onLogout } from "@/store";

export const useAuthStore = () => {
  const { status, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (body: object) => {
    try {
      console.log('INICIANDO SESION')
      console.log(body)
      const { data } = await coffeApi.post('/auth', body);
      console.log(data)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.staff))
      dispatch(onLogin(data.staff));
    } catch (error: any) {
      dispatch(onLogout());
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(localStorage.getItem('user')!);
      // console.log(user)
      return dispatch(onLogin(user));
    } else {
      localStorage.clear();
      dispatch(onLogout());
    }
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  }



  return {
    //* Propiedades
    status,
    user,

    //* Métodos
    startLogin,
    checkAuthToken,
    startLogout,
  }

}
