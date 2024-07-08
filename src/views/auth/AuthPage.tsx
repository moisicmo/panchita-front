import { useState } from 'react';
import { Grid, IconButton, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuthStore, useForm } from '@/hooks';
import { ComponentButton, ComponentInput } from '@/components';
import logo from '@/assets/images/logo.png';

const loginFormFields = {
  email: '',
  password: '',
}
const formValidations = {
  email: [(value: any) => value.length >= 1, 'Debe ingresar su cuenta'],
  password: [(value: any) => value.length >= 4, 'La contraseña debe de tener más de 6 letras.'],
}

export const AuthPage = () => {
  const { startLogin } = useAuthStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(loginFormFields, formValidations);



  const loginSubmit = (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    startLogin({ email, password });
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', background: '#e60024' }}>
      <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
        <img src={logo} alt="Descripción de la imagen" style={{ maxWidth: '35vw' }} />
      </Grid>
      <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center" style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography style={{ color: 'white', fontWeight: 700, fontSize: 17 }} >ADMINISTRACIÓN</Typography>
        <div style={{ height: 10 }} />
        <form onSubmit={loginSubmit}>
          <ComponentInput
            type="email"
            label="Cuenta"
            name="email"
            value={email}
            onChange={onInputChange}
            error={!!emailValid && formSubmitted}
            helperText={formSubmitted ? emailValid : ''}
            sx={{
              '& label.Mui-focused': {
                color: 'white',
              },
              '& label:not(.Mui-focused)': {
                color: 'white', // Cambia el color del texto del Label a negro cuando no está enfocado
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                height: 'fit-content',
                '& fieldset': { borderColor: 'white' },
              },
            }}
            inputsx={{
              style: {
                color: 'white',
                height: '50px',
                borderColor: 'white'
                
              },
            }}
          />
          <div style={{ height: 10 }} />
          <ComponentInput
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            name="password"
            value={password}
            onChange={onInputChange}
            endAdornment={(
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )}
            error={!!passwordValid && formSubmitted}
            helperText={formSubmitted ? passwordValid : ''}
            sx={{
              '& label.Mui-focused': {
                color: 'white',
              },
              '& label:not(.Mui-focused)': {
                color: 'white', // Cambia el color del texto del Label a negro cuando no está enfocado
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                height: 'fit-content',
                '& fieldset': { borderColor: 'white' },
              },
              
            }}
            inputsx={{
              style: {
                color: 'white',
                height: '50px',
                borderColor: 'white'
                
              },
            }}
          />
          <div style={{ height: 10 }} />
          <ComponentButton type="submit" text="INGRESAR" width="100%" sx={{ background: '#F2F2F2', color: 'red' }} />
        </form>
      </Grid>
    </Grid >
  )
}