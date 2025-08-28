// frontend/src/pages/Statistics.jsx
import { useState, useEffect } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Header from '../components/Header';
import UsageChart from '../components/UsageChart';
import HistoryTable from '../components/HistoryTable';
import CategoryChart from '../components/CategoryChart';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

import { apiGet } from '../services/api'; // <-- usa o serviço centralizado

const Statistics = () => {
  // estados dos cards
  const [diasUsados, setDiasUsados] = useState(0);
  const [produtividade, setProdutividade] = useState(0);
  const [horas, setHoras] = useState(0);

  const [dadosGraficos, setDadosGraficos] = useState({
    usoSemana: [],
    usoMes: [],
    categoriasSemana: [],
    categoriasMes: [],
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await apiGet('/api/statistics/');

        setDiasUsados(data.diasUsados ?? 0);
        setProdutividade(data.diasProdutivos ?? 0);
        setHoras(data.horasDeFoco ?? 0);
        setDadosGraficos({
          usoSemana: data.usoSemana ?? [],
          usoMes: data.usoMes ?? [],
          categoriasSemana: data.categoriasSemana ?? [],
          categoriasMes: data.categoriasMes ?? [],
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    };

    fetchStatistics();
  }, []); // roda uma vez ao montar

  return (
    <Box>
      {/* Header */}
      <Header />

      {/* Tela de fundo off-white */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '8vh', md: '10vh' },
          left: 0,
          zIndex: -1,
          backgroundColor: 'white.off',
          width: '100%',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <Grid container spacing={3} direction="column">
          {/* Título: Painel de estatísticas */}
          <Grid size={12}>
            <Stack
              direction={{ xs: 'row', md: 'column' }}
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{
                padding: { md: 2, xs: 1 },
                backgroundColor: 'white.basic',
                mt: 2,
                ml: 5,
                mr: 5,
                borderRadius: { md: 12, xs: 8 },
              }}
            >
              <EqualizerIcon color="primary" />
              <Typography
                variant="h3"
                color="primary.main"
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  fontFamily: 'cursive',
                }}
              >
                Painel de estatísticas
              </Typography>
            </Stack>
          </Grid>

          {/* Cards de métricas */}
          <Grid size={12}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ md: 5, xs: 2 }}
              alignItems="center"
              justifyContent="center"
            >
              {/* Dias usados */}
              <Box
                width={{ xs: '80%', md: '25%' }}
                padding={{ md: 3, xs: 2 }}
                borderRadius={{ md: 5, xs: 3 }}
                backgroundColor={'red.pastel'}
              >
                <Stack direction={'row'} spacing={1}>
                  <CalendarMonthOutlinedIcon color="primary" />
                  <Typography
                    variant="h5"
                    fontSize={{ md: '20px', xs: '18px' }}
                    align="left"
                    fontWeight="bold"
                    color="primary"
                  >
                    Dias usados
                  </Typography>
                </Stack>
                <Typography variant="body1" align="left" color="text.secondary">
                  Você usou por {diasUsados} dias
                </Typography>
              </Box>

              {/* Horas de foco */}
              <Box
                width={{ xs: '80%', md: '25%' }}
                padding={{ md: 3, xs: 2 }}
                borderRadius={{ md: 5, xs: 3 }}
                backgroundColor={'yellow.pastel'}
              >
                <Stack direction={'row'} spacing={1}>
                  <AccessAlarmOutlinedIcon color="darkYellow" />
                  <Typography
                    variant="h5"
                    fontSize={{ md: '20px', xs: '18px' }}
                    color="darkYellow"
                    align="left"
                    fontWeight="bold"
                  >
                    Horas
                  </Typography>
                </Stack>

                <Typography variant="body1" align="left" color="text.secondary">
                  Você já dedicou {horas} horas de foco!
                </Typography>
              </Box>

              {/* Produtividade */}
              <Box
                width={{ xs: '80%', md: '25%' }}
                padding={{ md: 3, xs: 2 }}
                borderRadius={{ md: 5, xs: 3 }}
                backgroundColor={'green.pastel'}
              >
                <Stack direction={'row'} spacing={1}>
                  <FastForwardOutlinedIcon color="darkGreen" />
                  <Typography
                    variant="h5"
                    fontSize={{ md: '20px', xs: '18px' }}
                    align="left"
                    fontWeight="bold"
                    color="darkGreen"
                  >
                    Produtividade
                  </Typography>
                </Stack>
                <Typography variant="body1" align="left" color="text.secondary">
                  Você foi produtivo por {produtividade} dias!! Continue assim
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Gráficos */}
          <Grid size={12}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ md: 12, xs: 4 }}
              justifyContent="center"
              p={{ xs: 2, md: 0 }}
            >
              <UsageChart chartHeight={300} dadosUso={dadosGraficos} />
              <CategoryChart chartHeight={300} dadosCategoria={dadosGraficos} />
            </Stack>
          </Grid>

          {/* Título: Histórico de Atividades */}
          <Grid size={12}>
            <Stack
              direction={{ xs: 'row', md: 'column' }}
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{
                padding: { md: 2, xs: 1 },
                backgroundColor: 'white.basic',
                mt: 2,
                ml: 5,
                mr: 5,
                borderRadius: { md: 12, xs: 8 },
              }}
            >
              <ManageHistoryIcon color="primary" />
              <Typography
                variant="h3"
                color="primary.main"
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  fontFamily: 'cursive',
                }}
              >
                Historico de Atividades
              </Typography>
            </Stack>
          </Grid>

          {/* Tabela de histórico */}
          <Grid size={12}>
            <HistoryTable />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Statistics;
