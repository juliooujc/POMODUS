import { useState, useEffect } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Stack, Button, Typography } from '@mui/material';


// prop pra alterar o tamanho dele
const UsageChart = ({ chartHeight, dadosUso }) => {

    // dados do grafico eixo x e eixo y
    const [dataY, setDataY] = useState([]);
    const [dataX, setDataX] = useState([]);


    // efeito de botao selecionado
    const [selecionado, setSelecionado] = useState('semana');

    // dado mockado!!
    const handleNessaSemana = () => {
        const diasSemana = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
        setDataX(diasSemana);
        setDataY(dadosUso.usoSemana || []);
        setSelecionado('semana');
    };

    // dado mockado!!
    const handleNesseMes = () => {
        const diasMes = Array.from({ length: 31 }, (_, i) => i + 1);
        setDataX(diasMes.map(String));
        setDataY(dadosUso.usoMes || []);
        setSelecionado('mes');
    };

    return (
        <Box backgroundColor={'white.basic'} padding={{md:5, xs:2}} borderRadius={{md:16, xs:8}}>
            <Typography variant="h3" color="black"
                    sx={{
                        fontSize: { xs: '1.2rem', md: '1.4rem' }, 
                        fontWeight:'bold',
                        textAlign: 'center',
                        paddingBottom: 3
                    }}>
                    Horas focadas
                </Typography>
            <Stack spacing={3} direction={'row'} justifyContent="flex-end" width="100%">
                <Button variant="text" onClick={handleNessaSemana} sx={{
                    backgroundColor: selecionado === 'semana' ? "primary.main" : 'transparent',
                    color: selecionado === 'semana' ? 'white.basic' : 'primary.main',
                }}>
                    Nessa semana
                </Button>
                <Button variant="text" onClick={handleNesseMes} sx={{
                    backgroundColor: selecionado === 'mes' ? "primary.main" : 'transparent',
                    color: selecionado === 'mes' ? 'white.basic' : 'darkGreen.main',
                }}>
                    Nesse mês
                </Button>

            </Stack>
            <BarChart
                height={chartHeight} // apenas height é preciso, width automaticamente ocupa 100% do componente
                
                xAxis={[{
                    id: 'dias da semana',
                    label: 'dias da semana',
                    data: dataX,
                    scaleType: 'band', // garante espaçamento uniforme entre a label embaixo
                },]}
                series={[{
                    label: 'Horas trabalhadas',
                    data: dataY,
                    color: '#D32F2F'
                },]}

                // TO DO: usar slotprops pra alterar a fonte
            />
        </Box>

    )
}

export default UsageChart
