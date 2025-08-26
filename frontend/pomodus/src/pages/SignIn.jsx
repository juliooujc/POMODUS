// src/pages/SignIn.jsx
import { useState } from 'react'
import { Box, Paper, Stack, Typography, Grid, TextField, Button, FormControlLabel, Checkbox } from '@mui/material'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';

const SignIn = () => {
  // Nome, Email e Senha
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado extra
  const [aceite, setAceite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!aceite) {
      setErro('É necessário aceitar os termos e condições de uso.');
      return;
    }
    setErro('');
    setLoading(true);
    try {
      // registra usuário
      await apiPost('/api/auth/register', { name: nome, email, password });
      // após cadastro, redireciona para login
      navigate('/login');
    } catch (err) {
      setErro(err.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  }

  function HandleVoltar(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <Box>
      {/* Header */}
      <Header />
      {/* Tela de fundo Vermelha */}
      <Box sx={{
        position: 'absolute',
        m:0,
        p:0,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Bloco de cadastro */}
        <Paper elevation={12} sx={{
          width: { xs: '90%', sm: '70%', md: '50%' },
          maxWidth: '500px',
          height: 'auto',
          padding: { xs: 3, md: 5 },
          margin: { xs: 2, md: 15 }
        }}>
          {/* Grid de cadastro */}
          <Grid container spacing={3} direction="column" component="form" onSubmit={handleSubmit}>
            {/* Logo + Nome */}
            <Grid size={12}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <img src="interface/logo.svg" alt="logo" style={{ width: '40px', height: 'auto' }} />
                <Typography variant="h3" color="black"
                  sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, fontFamily: 'cursive' }}>
                  Pomodus
                </Typography>
              </Stack>
            </Grid>

            {/* Texto: Crie sua conta */}
            <Grid size={12}>
              <Typography variant="h5" align="left" fontWeight="bold">Crie sua conta</Typography>
              <Typography variant="body1" align="left" color="text.secondary">
                Bem-vindo! Cadastre-se para organizar seu dia com leveza e foco.
              </Typography>
            </Grid>

            {/* Formulário */}
            <Grid size={12}>
              <Stack spacing={2}>
                <TextField required id='nome' label='Nome' type="text" variant="outlined" fullWidth
                  value={nome} onChange={(e) => setNome(e.target.value)} />
                <TextField required id='email' label='Email' type="email" variant="outlined" fullWidth
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField required id='senha' label="Senha" type="password" variant="outlined" fullWidth
                  value={password} onChange={(e) => setPassword(e.target.value)} />

                <FormControlLabel
                  control={<Checkbox checked={aceite} onChange={(e)=>setAceite(e.target.checked)} />}
                  label="Aceito os termos e condições de uso"
                />

                {erro && <Typography color="error" variant="body2">{erro}</Typography>}

                <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
                  {loading ? 'Cadastrando...' : 'Iniciar Jornada'}
                </Button>
                <Button variant="outlined" size="large" fullWidth onClick={HandleVoltar}>
                  Voltar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  )
}

export default SignIn
