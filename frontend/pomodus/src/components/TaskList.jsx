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

//icons
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from '@mui/icons-material/Refresh';

import TaskItem from "./TaskItem";

const TaskList = ({ onTaskSelect, refresh }) => {
    const [tab, setTab] = useState(0);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Menu de filtro
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const open = Boolean(anchorEl);

    // Dados mockados para fallback


    // Converter estrutura do backend para frontend
    const convertBackendToFrontend = (backendTask) => ({
        id: backendTask.id,
        titulo: backendTask.title,
        obs: backendTask.description || '',
        checked: backendTask.completed || false,
        tag: backendTask.priority || '',
        progress: 0,
        total: 99, // tem que mexer aqui pro contador de ciclos ficar certinho
        status: backendTask.completed ? 'Completed' : 'ToDo'
    });

    // Converter estrutura do frontend para backend
    const convertFrontendToBackend = (frontendTask) => ({
        title: frontendTask.titulo,
        description: frontendTask.obs,
        completed: frontendTask.checked,
        priority: frontendTask.tag || frontendTask.priority, // R.I.P Medium
        // cade o responsavel pelo contador de ciclos heree
    });

    // Buscar tarefas do backend
    const fetchTasks = async () => {
        try {
            setLoading(true);
            console.log("Buscando tarefas...");
            
            const response = await fetch('http://localhost:5000/api/tasks');
            
            if (!response.ok) {
                throw new Error('Erro ao buscar tarefas');
            }

            const backendTasks = await response.json();
            const frontendTasks = backendTasks.map(convertBackendToFrontend);
            setTasks(frontendTasks);
            
        } catch (err) {
            console.error('Erro ao buscar tarefas:', err);
            setError(err.message);
            setSnackbar({ open: true, message: 'Erro ao carregar tarefas. Usando dados locais.', severity: 'warning' });
            
        } finally {
            setLoading(false);
        }
    };

    // Atualizar tarefa no backend
    const updateTask = async (taskId, updates) => {
        try {
            const backendData = convertFrontendToBackend(updates);
            
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(backendData)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar tarefa');
            }

            const updatedBackendTask = await response.json();
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
        try {
            console.log("Dados da tarefa a ser criada:", taskData);
            
            const backendData = convertFrontendToBackend(taskData);
            console.log("Dados convertidos para backend:", backendData);
            
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(backendData)
            });

            console.log("Resposta do servidor:", response.status, response.statusText);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erro detalhado:", errorText);
                throw new Error('Erro ao criar tarefa: ' + errorText);
            }

            const newBackendTask = await response.json();
            console.log("Tarefa criada no backend:", newBackendTask);
            const newFrontendTask = convertBackendToFrontend(newBackendTask);
            
            setTasks(prev => [...prev, newFrontendTask]);
            setSnackbar({ open: true, message: 'Tarefa criada com sucesso', severity: 'success' });
            
            return newFrontendTask;
            
        } catch (err) {
            console.error('Erro completo ao criar tarefa:', err);
            setSnackbar({ open: true, message: 'Erro ao criar tarefa', severity: 'error' });
            
            // Fallback: criar localmente
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
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar tarefa');
            }

            setTasks(prev => prev.filter(task => task.id !== taskId));
            setSnackbar({ open: true, message: 'Tarefa deletada com sucesso', severity: 'success' });
            
        } catch (err) {
            console.error('Erro ao deletar tarefa:', err);
            setSnackbar({ open: true, message: 'Erro ao deletar tarefa', severity: 'error' });
            throw err;
        }
    };

    useEffect(() => {
        fetchTasks();
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
            await updateTask(taskId, { checked });
        } catch (err) {
            // Reverter visualmente em caso de erro
            setTasks(prev => prev.map(task => 
                task.id === taskId ? { ...task, checked: !checked } : task
            ));
            console.error("erro: " + err);
        }
    };

    const handleTaskUpdate = async (taskId, updates) => {
        try {
            await updateTask(taskId, updates);
        } catch (err) {
            // Rollback não necessário pois o estado já foi atualizado localmente
            console.error("erro: " + err);
        }
    };

    const handleTaskDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
        } catch (err) {
            // Não remover visualmente em caso de erro
            console.error("erro: " + err);
        }
    };

    const handleCreateTask = async () => {
        try {
            const newTaskData = {
                titulo: "Nova Tarefa",
                obs: "",
                checked: false,
                tag: "",
                progress: 0,
                total: 0,
                status: "ToDo"
            };

            const newTask = await createTask(newTaskData);
            setEditingTaskId(newTask.id);
        } catch (err) {
            console.error('Erro ao criar tarefa:', err);
        }
    };

    // Coletar todas as tags únicas (usando priority do backend)
    const allTags = [...new Set(tasks.map((t) => t.tag))];

    // aplica filtro de tab + filtro de tags
    const filteredTasks = tasks
        .filter((task) => (tab === 0 ? !task.checked : task.checked))
        .filter((t) =>
            selectedTags.length > 0 ? selectedTags.includes(t.tag) : true
        );

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
                <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
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
                            onSelect={onTaskSelect}
                            isEditing={editingTaskId === task.id}
                            onEditToggle={setEditingTaskId}
                        />
                    ))
                )}
            </Box>

            {/* Botão Nova Tarefa com condicional de aparecer só quando tab for 0 */}
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
            </Button>)}

            {/* Snackbar para feedback */}
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