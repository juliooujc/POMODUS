import { Box, Button, IconButton, Typography, LinearProgress} from "@mui/material"
import { useState } from "react";

import ReplayIcon from '@mui/icons-material/Replay';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const Timer = () => {
    const bgColors = {
        pomodoro: "#BA4949",
        pausaCurta: "#73c765ff",
        pausaLonga : "#58A6F0"
    };

    const HandlePomodoro = () => {
        // adicionar logica pomodoro -> exemplo: adicionar +1 no ciclo da tarefa
        setModo('pomodoro');

    };

    const handlePausaCurta = () => {
        // adicionar logica pausa curta -> exemplo: adicionar +1 no ciclo da tarefa
        setModo('pausaCurta');
    };

    const handlePausaLonga = () => {
        // adicionar logica pausa longa -> exemplo: adicionar +1 no ciclo da tarefa
        setModo('pausaLonga');
    };

    const [modo, setModo] = useState('pomodoro'); //modificar aqui o modo

    return (
        <Box p={2} sx={{
            minWidth:{ md:'70vh', xs: '30vh'}, 
            bgcolor: bgColors[modo], 
            borderRadius:4,
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
            gap:3,
            padding:{ md:5, xs:3},
            height:{md:'40vh', xs:'45vh'}
        }}>
            {/* Botões de modo */}
            <Box sx={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap: 2
            }}>
                <Button variant="text" size="small" onClick={HandlePomodoro} sx={{
                    textTransform:'capitalize',
                    color:(modo==='pomodoro')? bgColors[modo]:'white.basic',
                    bgcolor: (modo==='pomodoro')? 'white.basic': bgColors[modo],
                    "&:active": {
                        bgcolor: "white.basic",
                        color: bgColors[modo]
                    }
                }}>Pomodoro</Button>
                <Button variant="text" size="small" onClick={handlePausaCurta} sx={{
                    textTransform:'capitalize',
                    color:(modo==='pausaCurta')? bgColors[modo]:'white.basic',
                    bgcolor: (modo==='pausaCurta')? 'white.basic': bgColors[modo],
                    "&:active": {
                        bgcolor: "white.basic",
                        color: bgColors[modo]
                    }
                }}>Pausa Curta</Button>
                <Button variant="text" size="small" onClick={handlePausaLonga} sx={{
                    textTransform:'capitalize',
                    color:(modo==='pausaLonga')? bgColors[modo]:'white.basic',
                    bgcolor: (modo==='pausaLonga')? 'white.basic': bgColors[modo],
                    "&:active": {
                        bgcolor: "white.basic",
                        color: bgColors[modo]
                    }
                }}>Pausa Longa</Button>
            </Box>
            {/* Titulo e Time */}
            <Typography variant="body1" sx={{
                color:'white.basic',
                fontWeight:'bold'
            }}>Tarefa Título</Typography>{/* modificar titulo aqui */}
            <Typography variant="h2" sx={{
                color:'white.basic',
                fontWeight:'bold',
                fontFamily: 'cursive',
                fontSize:'12vh'
            }}>25:00</Typography>{/* modificar variavel aqui*/}

            {/* Barra de progresso */}
            <LinearProgress 
                variant="determinate" 
                value={50} // modificar aqui
                sx={{
                    width: '60%',
                    height: 6,
                    borderRadius: 5,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                    backgroundColor: 'white.basic',
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
                    <ReplayIcon sx={{color:'white.basic'}} />
                </IconButton>
                <Button variant="contained" sx={{bgcolor:'tertiary.main', color:'white.basic'}}>
                    Iniciar
                </Button>
                <IconButton>
                    <SkipNextIcon  sx={{color:'white.basic'}}/>
                </IconButton>
            </Box>
        </Box>
    )
}

export default Timer