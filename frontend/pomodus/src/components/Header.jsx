import { Paper, Typography, Button, Stack, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import TuneIcon from '@mui/icons-material/Tune';
import AvTimerIcon from '@mui/icons-material/AvTimer';

import ConfigPopup from './ConfigPopup';

const Header = () => {
  const navigate = useNavigate();
  const [openConfig, setOpenConfig] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

    const handleEstatisticas = () => {
    navigate("/estatisticas");
  };

  const handleHome = () => {
    navigate('/pages/home');

  };


  const handleConfig = () => {
    setOpenConfig(true);
  };

  return (
    <>
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          height: { xs: '8vh', md: '10vh' },
          justifyContent: "space-between",

          // garante ficar acima
          position: 'absolute',
          zIndex: 1,

          display: 'flex',
          alignItems: 'center',
          top: 0,
          gap: {md:'auto', xs:1},
        }}
      >
        {/* Logo e nome */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ ml: { xs: 1, md: 3 } , }}
        >
          <img
            src="/interface/logo.svg"
            alt="logo"
            style={{ width: '40px', height: 'auto' }}
          />
          <Typography
            variant="h3"
            color="white.basic"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontFamily: 'cursive',
              display: { xs: 'none', sm: 'inline' }
            }}
          >
            Pomodus
          </Typography>
        </Stack>

        {/* Botões centrais */}
        <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            variant="contained"
            sx={{
              mr:{md:3, xs:1},
              backgroundColor: '#efb8b823',
              gap: {md:1, xs:0},
              textTransform: 'capitalize',
            }}
            onClick={handleHome}
          >
            <AvTimerIcon />
            {/* Texto só aparece em sm pra cima */}
            <Typography sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Timer
            </Typography>
          </Button>

          <Button
            variant="contained"
            sx={{
              mr:{md:3, xs:1  },
              backgroundColor: '#efb8b823',
              gap: 1,
              textTransform: 'capitalize',
            }}
            onClick={handleEstatisticas}
          >
            <StackedBarChartIcon />
            <Typography sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Painel de Estatísticas
            </Typography>
          </Button>
        </Stack>


        {/* Ícones à direita */}
        <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton
            sx={{ mr: 1, color: 'white.basic' }}
            onClick={handleConfig}
          >
            <TuneIcon />
          </IconButton>
          <Button
            variant="contained"
            sx={{ mr: 3, backgroundColor: '#efb8b823', gap: 1 }}
            onClick={handleLogin}
          >
            Sair
          </Button>
        </Stack>
      </Paper>

      {/* Popup de Configurações */}
      <ConfigPopup open={openConfig} onClose={() => setOpenConfig(false)} />
    </>
  );
};

export default Header;
