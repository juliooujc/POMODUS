// login.jsx
import { useState } from 'react'
import { Box, Paper, Stack, Typography, Grid, TextField, Button, FormControlLabel, Checkbox, InputAdornment, IconButton } from '@mui/material'
import Header from '../components/Header'

import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  // Email e senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <Box>
      {/* Header */}
      <Header />
      {/* Tela de fundo Vermelha */}
      <Box sx={{
        position: 'absolute', // Faz a Box ignorar o fluxo normal da página
        top: 0,               // Garante que ela comece no topo
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>


        {/* Bloco para login */}
        <Paper sx={{
          width: { xs: '90%', sm: '70%', md: '50%' },
          maxWidth: '500px',
          height: 'auto',
          padding: { xs: 3, md: 5 },
          margin:{ xs: 2, md: 15}
        }}>
          {/* Grid de login */}
          <Grid container spacing={3} direction="column">
            {/* Logo + Nome */}
            <Grid size={12}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <img src="interface/logo.svg" alt="logo" style={{ width: '40px', height: 'auto' }} />
                <Typography variant="h3" color="black"
                  sx={{
                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                    fontFamily: 'cursive',
                  }}>
                  Pomodus
                </Typography>
              </Stack>
            </Grid>

            {/* Texto: Crie sua conta + Bem-vindo */}
            <Grid size={12}>
              <Typography variant="h5" align="center" fontWeight="bold">Bem-vindo(a) de volta!</Typography>
              <Typography variant="body1" align="center" color="text.secondary">Faça login para continuar.</Typography>
            </Grid>

            {/* Formulario: Email + senha + checkbox salvar usuário no localstorage*/}
            <Grid size={12}>
              <Stack spacing={2} component="form" onSubmit={() => { alert("oi") }}>
                <TextField required id='email' label='Email' type="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField
                  variant="outlined"
                  id='senha'
                  fullWidth
                  label="Senha"
                  type={mostrarSenha ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  margin="normal"
                  InputProps={{
                  endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setMostrarSenha((prev) => !prev)}
                      edge="end"
                      aria-label={
                        mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                    )
                  }}
                />
                <FormControlLabel control={<Checkbox />} label="Lembrar de mim" />
                <Button type="submit" variant="contained" size="large" fullWidth>
                  Entrar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

      </Box>

    </Box>

  )
}

export default Login