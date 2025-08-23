import React, { useState } from "react";
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
} from "@mui/material";

//icons
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from "@mui/icons-material/FilterList";

import TaskItem from "./TaskItem";

const TaskList = () => {
    const [tab, setTab] = useState(0);

    //provisório
    const [tasks, setTasks] = useState([
        {
            id: 1,
            titulo: "Tarefa #1",
            obs: "blabla",
            checked: true,
            tag: "Faculdade",
            progresso: 0,
            total: 4,
            status: "InProgress"
        },
        {
            id: 2,
            titulo: "Tarefa #2",
            obs: "blabla",
            checked: false,
            tag: "Casa",
            progresso: 0,
            total: 4,
            status: "ToDo"
        }
    ]);

    // Menu de filtro
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleToggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    // Coletar todas as tags únicas
    const allTags = [...new Set(tasks.map((t) => t.tag))];

    // aplica filtro de tab + filtro de tags
    const filteredTasks = tasks
        .filter((task) => (tab === 0 ? !task.checked : task.checked))
        .filter((t) =>
            selectedTags.length > 0 ? selectedTags.includes(t.tag) : true
        );

    return (
        <Box p={2} sx={{minWidth:{ md:'90vh', xs: '40vh'}, bgcolor:'white', borderRadius:2}} >
            
            {/* Tabs + botão filtro */}
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{borderBottom: '1px solid', borderColor: '#bebebeff'}}>
                <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
                    <Tab label="TAREFAS" />
                    <Tab label="CONCLUÍDAS" />
                </Tabs>

                <IconButton onClick={handleOpen}>
                    <FilterListIcon />
                </IconButton>
                
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
                {filteredTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={(id) => {
                            setTasks((prev) =>
                                prev.map((t) =>
                                    t.id === id ? { ...t, checked: !t.checked } : t
                                )
                            );
                        }}
                    />
                ))}
            </Box>

            {/* Botão Nova Tarefa */}
            <Button
                fullWidth
                variant="contained" 
                sx={{ mt: 2, 
                    borderRadius: 2, 
                    textTransform: "none",
                    bgcolor:"tertiary.main"
                }}
            >
                <AddIcon/>Nova Tarefa
            </Button>
        </Box>
    );
};

export default TaskList;
