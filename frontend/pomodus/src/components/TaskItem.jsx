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
    InputLabel
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onToggle, onEditToggle, isEditing }) => {
    const tagColors = {
        Faculdade: "rgba(61, 122, 255, 1)",
        Trabalho: "rgba(238, 156, 89, 1)",
        Casa: "rgba(231, 81, 81, 1)",
        Lazer: "rgba(131, 95, 172, 1)",
        Saude : "rgba(80, 185, 94, 1)"
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
                        defaultValue={task.titulo}
                        size="small"
                        label="Título"
                    />

                    {/* Observações */}
                    <TextField
                        fullWidth
                        defaultValue={task.obs}
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
                            defaultValue={task.progress}
                            sx={{ width: 100 }}
                        />
                        {/* Categoria */}
                        <FormControl >
                            <InputLabel>Categoria</InputLabel>
                            <Select
                                defaultValue={task.tag}
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
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Typography
                                variant="body2"
                                color="tertiary"
                                sx={{ cursor: "pointer" }}
                                onClick={() => onEditToggle(null)}
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
                                onClick={() => onEditToggle(null)}
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
                backgroundColor: task.checked ? "white.off" : "white.basic"
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{color:'text.secondary', gap:2}} >
                {/* Checkbox + título */}
                <Box display="flex" alignItems="center" gap={1}>
                    <Checkbox
                        checked={task.checked}
                        onChange={() => onToggle(task.id)}
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
                    <Chip label={task.tag} sx={{bgcolor: tagColors[task.tag], color:'white.basic'}} size="small" />
                    <Typography variant="body2">
                        {task.progress}/{task.total}
                    </Typography>
                    <IconButton size="small" onClick={() => onEditToggle(task.id)}>
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
            />
        </Paper>
    );
};

export default TaskItem;
