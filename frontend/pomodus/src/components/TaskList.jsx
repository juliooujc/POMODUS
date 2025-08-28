import React, { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  Tabs, 
  Tab,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";

// icons
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from '@mui/icons-material/Refresh';

import TaskItem from "./TaskItem";
import { apiGet, apiPost, apiPut, apiDelete } from "../services/api";

const TaskList = ({ onTaskSelect, refresh }) => {
  const [tab, setTab] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Novo estado para controlar a seleção única
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Menu de filtro
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const open = Boolean(anchorEl);

  // Converter backend -> frontend
  const convertBackendToFrontend = (backendTask) => ({
    id: backendTask.id,
    titulo: backendTask.title,
    obs: backendTask.description || '',
    checked: !!backendTask.completed,
    tag: backendTask.priority || '',
    progress: backendTask.progress ?? 0,
    total: backendTask.total ?? 0,
    status: backendTask.completed ? 'Completed' : 'ToDo'
  });

  // Converter frontend -> backend
  const convertFrontendToBackend = (frontendTask) => ({
    title: frontendTask.titulo,
    description: frontendTask.obs,
    completed: !!frontendTask.checked,
    priority: frontendTask.tag ?? frontendTask.priority ?? '',
    progress: frontendTask.progress ?? 0,
    total: frontendTask.total ?? 0
  });

  // Buscar tarefas do backend (por usuário autenticado)
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const backendTasks = await apiGet('/api/tasks/');
      const frontendTasks = backendTasks.map(convertBackendToFrontend);
      setTasks(frontendTasks);
    } catch (err) {
      console.error('Erro ao buscar tarefas:', err);
      setError(err.message);
      setSnackbar({ open: true, message: 'Erro ao carregar tarefas. Verifique seu login.', severity: 'warning' });
    } finally {
      setLoading(false);
    }
  };

  // Atualizar tarefa no backend
  const updateTask = async (taskId, updates) => {
    const backendData = convertFrontendToBackend(updates);
    try {
      const updatedBackendTask = await apiPut(`/api/tasks/${taskId}/`, backendData);
      const updatedFrontendTask = convertBackendToFrontend(updatedBackendTask);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...updatedFrontendTask } : task
      ));
      return updatedFrontendTask;
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
      setSnackbar({ open: true, message: 'Erro ao atualizar tarefa', severity: 'error' });
      throw err;
    }
  };

  // Criar nova tarefa no backend
  const createTask = async (taskData) => {
    const backendData = convertFrontendToBackend(taskData);
    try {
      const newBackendTask = await apiPost('/api/tasks/', backendData);
      const newFrontendTask = convertBackendToFrontend(newBackendTask);
      setTasks(prev => [...prev, newFrontendTask]);
      setSnackbar({ open: true, message: 'Tarefa criada com sucesso', severity: 'success' });
      return newFrontendTask;
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
      setSnackbar({ open: true, message: 'Erro ao criar tarefa', severity: 'error' });
      // Fallback local (não recomendado, mas evita travar a UI)
      const newTask = {
        id: Date.now().toString(),
        ...taskData
      };
      setTasks(prev => [...prev, newTask]);
      return newTask;
    }
  };

  // Deletar tarefa no backend
  const deleteTask = async (taskId) => {
    try {
      await apiDelete(`/api/tasks/${taskId}/`);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      
      // Desselecionar se a tarefa deletada estava selecionada
      if (taskId === selectedTaskId) {
        setSelectedTaskId(null);
      }
      
      setSnackbar({ open: true, message: 'Tarefa deletada com sucesso', severity: 'success' });
    } catch (err) {
      console.error('Erro ao deletar tarefa:', err);
      setSnackbar({ open: true, message: 'Erro ao deletar tarefa', severity: 'error' });
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleToggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleTaskToggle = async (taskId, checked) => {
    try {
      await updateTask(taskId, { ...tasks.find(t => t.id === taskId), checked });
      
      // Desselecionar se a tarefa for marcada como concluída
      if (checked && taskId === selectedTaskId) {
        setSelectedTaskId(null);
      }
    } catch (err) {
      // Reverter visualmente em caso de erro
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, checked: !checked } : task
      ));
    }
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      await updateTask(taskId, { ...tasks.find(t => t.id === taskId), ...updates });
    } catch (err) {
      // rollback não necessário, pois já tratamos estado no updateTask
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      // não remover visualmente em caso de erro
    }
  };

  const handleCreateTask = async () => {
    try {
      const newTaskData = {
        titulo: "Nova Tarefa",
        obs: "",
        checked: false,
        tag: "",
        progress: 0,  // ← Garantir que está aqui
        total: 4,     // ← Garantir que está aqui
        status: "ToDo"
      };
      const newTask = await createTask(newTaskData);
      setEditingTaskId(newTask.id);
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
    }
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTaskId(taskId);
    // Chamar a função passada por prop, se existir
    if (onTaskSelect) {
        const selectedTask = tasks.find(task => task.id === taskId);
        onTaskSelect(selectedTask); // Agora passa o objeto completo da tarefa
    }
};

  // Função para desselecionar uma tarefa
  const handleTaskDeselect = () => {
    setSelectedTaskId(null);
    // Chamar a função passada por prop, se existir
    if (onTaskSelect) {
      onTaskSelect(null);
    }
  };

  // Coletar todas as tags únicas
  const allTags = [...new Set(tasks.map((t) => t.tag).filter(Boolean))];

  // aplica filtro de tab + filtro de tags
  const filteredTasks = tasks
    .filter((task) => (tab === 0 ? !task.checked : task.checked))
    .filter((t) => selectedTags.length > 0 ? selectedTags.includes(t.tag) : true);

  if (loading) {
    return (
      <Box p={2} sx={{ minWidth: { md: '90vh', xs: '40vh' }, bgcolor: 'white.basic', borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2} sx={{ minWidth: { md: '90vh', xs: '40vh' }, bgcolor: 'white.basic', borderRadius: 2 }} >
      {/* Header com tabs e filtros */}
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ borderBottom: '1px solid', borderColor: '#bebebeff' }}>
        <Tabs value={tab} onChange={(e, newVal) => {
          setTab(newVal);
          // Desselecionar ao mudar de aba
          setSelectedTaskId(null);
        }}>
          <Tab label="TAREFAS" />
          <Tab label="CONCLUÍDAS" />
        </Tabs>

        <Box>
          <IconButton onClick={handleOpen}>
            <FilterListIcon />
          </IconButton>
          <IconButton onClick={fetchTasks}>
            <RefreshIcon />
          </IconButton>
        </Box>
        
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {allTags.map((tag) => (
            <MenuItem key={tag} onClick={() => handleToggleTag(tag)}>
              <Checkbox checked={selectedTags.includes(tag)} />
              <ListItemText primary={tag} />
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Lista de Tarefas */}
      <Box mt={2}>
        {filteredTasks.length === 0 ? (
          <Box textAlign="center" py={4}>
            <p>Nenhuma tarefa {tab === 0 ? 'pendente' : 'concluída'}</p>
          </Box>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleTaskToggle}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
              onSelect={handleTaskSelect}
              onDeselect={handleTaskDeselect}
              isEditing={editingTaskId === task.id}
              onEditToggle={(taskId) => {
                setEditingTaskId(taskId);
                // Desselecionar ao editar
                if (taskId === selectedTaskId) {
                  setSelectedTaskId(null);
                }
              }}
              isSelected={task.id === selectedTaskId}
            />
          ))
        )}
      </Box>

      {/* Botão Nova Tarefa quando tab === 0 */}
      {tab === 0 && (
        <Button
          fullWidth
          variant="contained" 
          sx={{ 
            mt: 2, 
            borderRadius: 2, 
            textTransform: "none",
            bgcolor: "tertiary.main"
          }}
          onClick={handleCreateTask}
          disabled={loading}
        >
          <AddIcon/>Nova Tarefa
        </Button>
      )}

      {/* Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskList;