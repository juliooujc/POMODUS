import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { Paper, Typography, Box } from '@mui/material';

// deixei dados mockados aqui
// nao consegui centralizar a tabela, mas fiz o possivel pra deixar bonitinha

const columns = [
  {
    field: 'id',
    headerName:
      'ID',
    width: 80,
    renderHeader: () => <Typography variant="body1" color="darkGreen">📂 ID</Typography>
  },

  {
    field: 'data',
    headerName: 'Data',
    width: 150,
    renderHeader: () => <Typography variant="body1" color="darkGreen">📅 Data</Typography>
  },

  {
    field: 'atividade',
    headerName: 'Atividade',
    width: 150,
    renderHeader: () => <Typography variant="body1" color="darkGreen">🏢 Atividades</Typography>
  },

  {
    field: 'horasGastas',
    headerName: 'Horas Gastas',
    width: 150,
    renderHeader: () => <Typography variant="body1" color="darkGreen">🕗 Horas Gastas</Typography>
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
    renderHeader: () => <Typography variant="body1" color="darkGreen">📂 Categoria</Typography>
  },

];

const rows = [
  { id: 1, data: '25/03/2025', atividade: 'Estudar React', horasGastas: '02:30', status: 'Concluído', categoria: 'Estudo' },
  { id: 2, data: '26/03/2025', atividade: 'Reunião com equipe', horasGastas: '01:15', status: 'Pendente', categoria: 'Trabalho' },
  { id: 3, data: '27/03/2025', atividade: 'Planejar Sprint', horasGastas: '00:45', status: 'Concluído', categoria: 'Gestão' },
  { id: 4, data: '28/03/2025', atividade: 'Revisar Pull Requests', horasGastas: '01:20', status: 'Em andamento', categoria: 'Desenvolvimento' },
  { id: 5, data: '29/03/2025', atividade: 'Escrever Documentação', horasGastas: '01:00', status: 'Concluído', categoria: 'Documentação' },
  { id: 6, data: '30/03/2025', atividade: 'Testar Funcionalidades', horasGastas: '02:10', status: 'Pendente', categoria: 'QA' },
  { id: 7, data: '31/03/2025', atividade: 'Atualizar Dependências', horasGastas: '00:30', status: 'Concluído', categoria: 'Manutenção' },
  { id: 8, data: '01/04/2025', atividade: 'Design de Interface', horasGastas: '03:00', status: 'Em andamento', categoria: 'UX/UI' },
  { id: 9, data: '02/04/2025', atividade: 'Pesquisa de Mercado', horasGastas: '01:40', status: 'Pendente', categoria: 'Marketing' },
  { id: 10, data: '03/04/2025', atividade: 'Configurar Ambiente', horasGastas: '00:50', status: 'Concluído', categoria: 'Infraestrutura' }
];


const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
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
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </Paper>

  );
}                                                         
