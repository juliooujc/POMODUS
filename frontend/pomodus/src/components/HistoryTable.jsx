import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Typography, useMediaQuery, createTheme } from '@mui/material';
import { apiGet } from '../services/api';

// Componente da Tabela de Histórico
const HistoryTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const tasks = await apiGet('/api/tasks/');
        const formattedTasks = tasks.map(task => ({
          id: task.id,
          data: new Date(task.updated_at).toLocaleDateString(),
          atividade: task.title,
          horasGastas: '00:25', // Placeholder, já que a API não fornece
          status: task.completed ? 'Concluído' : 'Pendente',
          categoria: task.priority || 'N/A',
        }));
        setRows(formattedTasks);
      } catch (error) {
        console.error("Erro ao buscar histórico de tarefas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const columns = [
    {
      field: 'data',
      headerName: '📅 Data',
      width: 150,
      renderHeader: () => <Typography variant="body1" color="darkGreen">📅 Data</Typography>
    },
    {
      field: 'atividade',
      headerName: 'Atividade',
      width: 200,
      renderHeader: () => <Typography variant="body1" color="darkGreen">🏢 Atividades</Typography>
    },
    {
      field: 'horasGastas',
      headerName: 'Horas Gastas',
      width: 150,
      renderHeader: () => <Typography variant="body1" color="darkGreen">🕗 Horas Gastas</Typography>,
      hide: isMobile, // Oculta em telas pequenas
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderHeader: () => <Typography variant="body1" color="darkGreen">📊 Status</Typography>
    },
    {
      field: 'categoria',
      headerName: 'Categoria',
      width: 150,
      renderHeader: () => <Typography variant="body1" color="darkGreen">📂 Categoria</Typography>,
      hide: isMobile, // Oculta em telas pequenas
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        overflow: 'hidden',
        maxWidth: '100%',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns.filter(column => !column.hide)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        loading={loading}
        autoHeight
      />
    </Paper>
  );
}

export default HistoryTable;