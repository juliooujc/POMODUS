import { Box, Button, IconButton, Typography, LinearProgress} from "@mui/material"
import { useState } from "react";

import ReplayIcon from '@mui/icons-material/Replay';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const Timer = () => {
    const bgColors = {
        pomodoro: "#BA4949",
        pausaCurta: "#79da6aff",
        pausaLonga : "#58A6F0"
    };

    const [modo, setModo] = useState('pomodoro');

    return (
        <Box p={2} sx={{
            minWidth:{ md:'80vh', xs: '30vh'}, 
            bgcolor: bgColors[modo], 
            borderRadius:4,
            marginTop:{ xs:1, md:8 },
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
            gap:3,
            padding:4,
        }}>
            {/* Botões de modo */}
            <Box sx={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap: 2
            }}>
                <Button variant="text" select sx={{
                    textTransform:'capitalize',
                    color:(modo==='pomodoro')? bgColors[modo]:'white',
                    bgcolor: (modo==='pomodoro')? 'white': bgColors[modo],
                    "&:active": {
                        bgcolor: "white",
                        color: bgColors[modo]
                    }
                }}>Pomodoro</Button>
                <Button variant="text" sx={{
                    textTransform:'capitalize',
                    color:(modo==='pausaCurta')? bgColors[modo]:'white',
                    bgcolor: (modo==='pausaCurta')? 'white': bgColors[modo],
                    "&:active": {
                        bgcolor: "white",
                        color: bgColors[modo]
                    }
                }}>Pausa Curta</Button>
                <Button variant="text" sx={{
                    textTransform:'capitalize',
                    color:(modo==='pausaLonga')? bgColors[modo]:'white',
                    bgcolor: (modo==='pausaLonga')? 'white': bgColors[modo],
                    "&:active": {
                        bgcolor: "white",
                        color: bgColors[modo]
                    }
                }}>Pausa Longa</Button>
            </Box>
            {/* Titulo e Time */}
            <Typography variant="body1" sx={{
                color:'white',
                fontWeight:'bold',
                fontSize: '18px'
            }}>Tarefa Título</Typography>
            <Typography variant="h1" sx={{
                color:'white',
                fontWeight:'bold',
                fontFamily: 'cursive',
            }}>25:00</Typography>

            {/* Barra de progresso */}
            <LinearProgress 
                variant="determinate" 
                value={50} 
                sx={{
                    width: '60%',
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                    backgroundColor: 'white',
                    }
                }} 
            />

            {/* Botões de controle*/}
            <Box sx={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap: 2
            }}>
                <IconButton>
                    <ReplayIcon sx={{color:'white'}}/>
                </IconButton>
                <Button variant="contained" sx={{bgcolor:'tertiary.main', color:'white'}}>
                    Iniciar
                </Button>
                <IconButton>
                    <SkipNextIcon  sx={{color:'white'}}/>
                </IconButton>
            </Box>
        </Box>
    )
}

export default Timer