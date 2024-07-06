import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { coffeApi } from "@/services";
import { onLogin, onLogout, setRoleUser } from "@/store";

export const useAuthStore = () => {
  const { status, user, roleUser } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  let passwordInput1: HTMLInputElement
  let passwordInput2: HTMLInputElement

  const changePassword = async (staffId: number) => {
    const { value: formValues } = await Swal.fire({
      title: 'Cambiar contraseña',
      html: `
        <input type="password" id="password1" class="swal2-input" placeholder="Contraseña">
        <input type="password" id="password2" class="swal2-input" placeholder="Repita la contraseña">
      `,
      confirmButtonText: 'Sign in',
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!
        passwordInput1 = popup.querySelector('#password1') as HTMLInputElement
        passwordInput2 = popup.querySelector('#password2') as HTMLInputElement
        passwordInput1.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
        passwordInput2.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      },
      preConfirm: () => {
        const password1 = passwordInput1.value
        const password2 = passwordInput2.value
        if (!password1 || !password2) {
          Swal.showValidationMessage(`Ingresa la contraseña`)
        }
        if (password1 != password2) {
          Swal.showValidationMessage(`Las contraseñas deben ser iguales`)
        }
        return { password1, password2 }
      },
    });
    if (formValues) {
      try {
        const { data } = await coffeApi.post(`/auth/change/pwd/${staffId}`, formValues);
        console.log(data);
        Swal.fire('Contaseña actualizado', '', 'success');
      } catch (error: any) {
        Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
      }

    }
  }
  const startLogin = async (body: object) => {
    try {
      console.log('INICIANDO SESION')
      console.log(body)
      const { data } = await coffeApi.post('/auth', body);
      console.log(data)
      if (!data.staff.validate) {
        changePassword(data.staff.id);
        return;
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.staff))
      dispatch(onLogin(data.staff));
      dispatch(setRoleUser({ role: data.staff.role }))
      localStorage.setItem('role', JSON.stringify(data.staff.role));
      localStorage.setItem('superStaff', JSON.stringify(data.staff.superStaff));
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
      const role = JSON.parse(localStorage.getItem('role')!)
      dispatch(setRoleUser({ role: role }));
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
    roleUser,

    //* Métodos
    startLogin,
    checkAuthToken,
    startLogout,
  }

}
