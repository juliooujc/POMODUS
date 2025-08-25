import { useState } from 'react';
import { Box, Stack, Button } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const CategoryChart = ({ chartHeight }) => {
    // efeito de botao selecionado
    const [selecionado, setSelecionado] = useState('semana');
    const [data, setData] = useState([]);

    const handleNessaSemana = () => {
        setSelecionado('semana');
        setData(dataSemana);
    };

    const handleNesseMes = () => {
        setSelecionado('mes');
        setData(dataMes);
    };

    // dados mockados
    const dataSemana = [
        { label: 'Trabalho', value: 3, color: '#0088FE' },
        { label: 'Estudo', value: 4, color: '#00C49F' },
        { label: 'Faculdade', value: 10, color: '#FFBB28' },
        { label: 'Programação', value: 2, color: '#FF8042' },
    ];

    const dataMes = [
        { label: 'Trabalho', value: 15, color: '#0088FE' },
        { label: 'Estudo', value: 3, color: '#00C49F' },
        { label: 'Faculdade', value: 10, color: '#FFBB28' },
        { label: 'Programação', value: 12, color: '#FF8042' },
    ];

    const settings = {
        margin: { right: 5 },
        width: 200,
        height: 200,
        hideLegend: false,
    };


    return (
        <Box backgroundColor={'white.basic'} padding={5} borderRadius={16}>
            <Stack spacing={3} direction={'row'} justifyContent="flex-end" width="100%">
                <Button variant="text" onClick={handleNessaSemana} sx={{
                    backgroundColor: selecionado === 'semana' ? "darkGreen.main" : 'transparent',
                    color: selecionado === 'semana' ? 'white.basic' : 'darkGreen.main',
                }}>
                    Nessa semana
                </Button>
                <Button variant="text" onClick={handleNesseMes} sx={{
                    backgroundColor: selecionado === 'mes' ? "darkGreen.main" : 'transparent',
                    color: selecionado === 'mes' ? 'white.basic' : 'darkGreen.main',
                }}>
                    Nesse mês
                </Button>
            </Stack>

            <PieChart
                series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
                width={300}
                {...settings}

            />
        </Box>
    )
}

export default CategoryChart;
