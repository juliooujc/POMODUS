import TaskList from "../components/TaskList"
import Header from "../components/Header"
import { Box } from "@mui/material"
import Timer from "../components/Timer"

const Home = () => {
  return (
    <>
      <Header />
      <Box sx={{
        padding: { xs:1, md:5 },
        paddingTop: { xs: '9vh', md: '12vh' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent:'space-between',
        gap:1
      }}>
        <Timer/>
        <TaskList/>
      </Box>
    </>
  )
}

export default Home