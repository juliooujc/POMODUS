import TaskList from "../components/TaskList"
import Header from "../components/Header"
import { Box } from "@mui/material"
import Timer from "../components/Timer"
import { useState } from "react"

const Home = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshTasks, setRefreshTasks] = useState(false);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleTimerComplete = () => {
    setRefreshTasks(prev => !prev); // Força atualização da lista de tarefas
  };

  return (
    <>
      <Header />
      <Box sx={{
        padding: { xs: 1, md: 8 },
        paddingTop: { xs: '9vh', md: '12vh' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        gap: 4,
        alignItems: 'flex-start'
      }}>
        <Timer 
          selectedTask={selectedTask} 
          onTimerComplete={handleTimerComplete}
        />
        <TaskList 
          onTaskSelect={handleTaskSelect}
          refresh={refreshTasks}
        />
      </Box>
    </>
  )
}

export default Home