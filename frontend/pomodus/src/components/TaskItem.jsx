import { useState } from "react";
import {
    Box,
    Checkbox,
    Typography,
    TextField,
    Chip,
    IconButton,
    Paper,
    FormControl, 
    Select,
    MenuItem,
    InputLabel,
    Button
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onToggle, onUpdate, onDelete, onSelect, isEditing, onEditToggle, isSelected, onDeselect }) => {
    const [editData, setEditData] = useState({
        titulo: task.titulo,
        obs: task.obs,
        progress: task.progress,
        total: task.total || 4,
        tag: task.tag
    });

    const tagColors = {
        Faculdade: "rgba(61, 122, 255, 1)",
        Trabalho: "rgba(238, 156, 89, 1)",
        Casa: "rgba(231, 81, 81, 1)",
        Lazer: "rgba(131, 95, 172, 1)",
        Saude : "rgba(80, 185, 94, 1)"
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        onUpdate(task.id, editData);
        onEditToggle(null);
    };

    const handleCancel = () => {
        setEditData({
            titulo: task.titulo,
            obs: task.obs,
            progress: task.progress,
            total: task.total || 4, // Default para 4
            tag: task.tag
        });
        onEditToggle(null);
    };

    const handleDeleteClick = () => {
        onDelete(task.id);
    };

    const handleToggle = () => {
        onToggle(task.id, !task.checked);
    };

    const handleSelectClick = (e) => {
        e.stopPropagation();
        
        if (!isEditing && !task.checked) {
            if (isSelected) {
                // Se já está selecionado, desseleciona
                onDeselect();
            } else {
                // Seleciona esta tarefa
                onSelect(task.id);
            }
        }
    };

    if (isEditing) {
        return(
            <Paper
                elevation={2}
                sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    backgroundColor: "#F5F5F5"
                }}
            >
                <Box display="flex" flexDirection="column" gap={2}>
                    {/* Campo título */}
                    <TextField
                        fullWidth
                        value={editData.titulo}
                        onChange={(e) => handleInputChange('titulo', e.target.value)}
                        size="small"
                        label="Título"
                    />

                    {/* Observações */}
                    <TextField
                        fullWidth
                        value={editData.obs}
                        onChange={(e) => handleInputChange('obs', e.target.value)}
                        size="small"
                        multiline
                        label="Obs:"
                    />

                    <Box display="flex" alignItems="center" gap={2}>
                        {/* Ciclos */}
                        <TextField
                            type="number"
                            size="small"
                            label="Ciclos"
                            value={editData.total}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                // Garante que o valor seja pelo menos 1
                                if (value >= 1) {
                                    handleInputChange('total', value);
                                }
                            }}
                            sx={{ width: 100 }}
                        />
                        {/* Categoria */}
                        <FormControl >
                            <InputLabel>Categoria</InputLabel>
                            <Select
                                value={editData.tag}
                                onChange={(e) => handleInputChange('tag', e.target.value)}
                                label="Selecionar Categoria"
                                size="small"
                                sx={{ minWidth: 150 }}
                            >
                                {Object.keys(tagColors).map((tag) => (
                                    <MenuItem key={tag} value={tag}>
                                        {tag}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Ações */}
                    <Box display="flex" justifyContent="space-between" alignItems='center' gap={2}>
                        <IconButton onClick={handleDeleteClick}>
                            <DeleteIcon/>
                        </IconButton>
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Typography
                                variant="body2"
                                color="tertiary"
                                sx={{ cursor: "pointer" }}
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    bgcolor: "tertiary.main",
                                    color: "white.basic",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1,
                                    cursor: "pointer"
                                }}
                                onClick={handleSave}
                            >
                                Salvar
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        )
    }

    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                backgroundColor: task.checked ? "white.off" : "white.basic",
                cursor: task.checked ? 'default' : 'pointer',
                transition: 'all 0.3s ease'
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{color:'text.secondary', gap:2}} >
                {/* Checkbox + título */}
                <Box display="flex" alignItems="center" gap={1}>
                    <Checkbox
                        checked={task.checked}
                        onChange={handleToggle}
                        sx={{ color: task.checked ? "primary.main" : "inherit" }}
                    />
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: task.checked ? "primary.main" : "text.secondary" }}
                    >
                        {task.titulo}
                    </Typography>
                </Box>

        
                {/* Chip e contador */}
                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                    <Chip 
                        label={`${task.total} ${task.total === 1 ? 'ciclo' : 'ciclos'}`}
                        sx={{
                            bgcolor: tagColors[task.tag],
                            color: 'white.basic',
                            height: '24px'
                        }} 
                        size="small" 
                    />
                    <Chip 
                        label={task.tag} 
                        sx={{
                            bgcolor: tagColors[task.tag], 
                            color: 'white.basic'
                        }} 
                        size="small" 
                    />
                    <IconButton 
                        size="small" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditToggle(task.id);
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* Observações */}
            <TextField
                fullWidth
                size="small"
                margin="dense"
                placeholder="Obs:"
                value={task.obs}
                disabled
                sx={{ mb: 1 }}
            />
            
            {/* Botão Selecionar */}
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    size="small"
                    disabled={task.checked}
                    sx={{
                        backgroundColor: isSelected ? '#4caf50' : 'rgba(0, 0, 0, 0.12)',
                        color: isSelected ? '#fff' : 'rgba(0, 0, 0, 0.38)',
                        '&:hover': {
                            backgroundColor: isSelected ? '#388e3c' : 'rgba(0, 0, 0, 0.16)'
                        },
                        '&:disabled': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                            color: 'rgba(0, 0, 0, 0.26)'
                        },
                        transition: 'all 0.3s ease',
                        minWidth: '100px'
                    }}
                    onClick={handleSelectClick}
                >
                    {isSelected ? 'Selecionado' : 'Selecionar'}
                </Button>
            </Box>
        </Paper>
    );
};

export default TaskItem;