import { Box, Button, IconButton, Typography, LinearProgress } from "@mui/material"
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import ReplayIcon from '@mui/icons-material/Replay';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const Timer = ({ selectedTask, onTimerComplete }) => {
    const [modo, setModo] = useState('pomodoro');
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos em segundos
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);
    const { user } = useAuth(); // Hook para obter usuário autenticado

    const timeConfig = {
        pomodoro: 25 * 60, // 25 minutos
        pausaCurta: 5 * 60, // 5 minutos
        pausaLonga: 15 * 60 // 15 minutos
    };

    const bgColors = {
        pomodoro: "#BA4949",
        pausaCurta: "#73c765ff",
        pausaLonga: "#58A6F0"
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        handleTimerComplete();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    useEffect(() => {
        const totalTime = timeConfig[modo];
        const calculatedProgress = ((totalTime - timeLeft) / totalTime) * 100;
        setProgress(calculatedProgress);
    }, [timeLeft, modo]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(timeConfig[modo]);
        setProgress(0);
    };

    const handleSkip = () => {
        setIsRunning(false);
        // Alternar entre modos
        const modes = ['pomodoro', 'pausaCurta', 'pausaLonga'];
        const currentIndex = modes.indexOf(modo);
        const nextMode = modes[(currentIndex + 1) % modes.length];
        setModo(nextMode);
        setTimeLeft(timeConfig[nextMode]);
        setProgress(0);
    };

    const handleTimerComplete = async () => {
        setIsRunning(false);
        
        if (modo === 'pomodoro' && selectedTask) {
            // Registrar pomodoro completado no backend
            try {
                const response = await fetch('http://localhost:3001/api/pomodoros', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}` // Se estiver usando autenticação
                    },
                    body: JSON.stringify({
                        taskId: selectedTask.id,
                        duration: timeConfig.pomodoro,
                        completedAt: new Date().toISOString()
                    })
                });

                if (response.ok) {
                    console.log('Pomodoro registrado com sucesso!');
                    if (onTimerComplete) {
                        onTimerComplete();
                    }
                }
            } catch (error) {
                console.error('Erro ao registrar pomodoro:', error);
            }
        }

        // Notificar usuário
        if (Notification.permission === 'granted') {
            new Notification(modo === 'pomodoro' ? 'Pomodoro concluído!' : 'Pausa concluída!');
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const HandlePomodoro = () => {
        if (!isRunning) {
            setModo('pomodoro');
            setTimeLeft(timeConfig.pomodoro);
            setProgress(0);
        }
    };

    const handlePausaCurta = () => {
        if (!isRunning) {
            setModo('pausaCurta');
            setTimeLeft(timeConfig.pausaCurta);
            setProgress(0);
        }
    };

    const handlePausaLonga = () => {
        if (!isRunning) {
            setModo('pausaLonga');
            setTimeLeft(timeConfig.pausaLonga);
            setProgress(0);
        }
    };

    return (
        <Box p={2} sx={{
            minWidth: { md: '70vh', xs: '30vh' }, 
            bgcolor: bgColors[modo], 
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: { md: 5, xs: 3 },
            height: { md: '40vh', xs: '45vh' }
        }}>
            {/* Botões de modo */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2
            }}>
                <Button variant="text" size="small" onClick={HandlePomodoro} sx={{
                    textTransform: 'capitalize',
                    color: (modo === 'pomodoro') ? bgColors[modo] : 'white',
                    bgcolor: (modo === 'pomodoro') ? 'white' : 'transparent',
                    "&:hover": {
                        bgcolor: (modo === 'pomodoro') ? 'white' : 'rgba(255,255,255,0.1)'
                    }
                }}>Pomodoro</Button>
                <Button variant="text" size="small" onClick={handlePausaCurta} sx={{
                    textTransform: 'capitalize',
                    color: (modo === 'pausaCurta') ? bgColors[modo] : 'white',
                    bgcolor: (modo === 'pausaCurta') ? 'white' : 'transparent',
                    "&:hover": {
                        bgcolor: (modo === 'pausaCurta') ? 'white' : 'rgba(255,255,255,0.1)'
                    }
                }}>Pausa Curta</Button>
                <Button variant="text" size="small" onClick={handlePausaLonga} sx={{
                    textTransform: 'capitalize',
                    color: (modo === 'pausaLonga') ? bgColors[modo] : 'white',
                    bgcolor: (modo === 'pausaLonga') ? 'white' : 'transparent',
                    "&:hover": {
                        bgcolor: (modo === 'pausaLonga') ? 'white' : 'rgba(255,255,255,0.1)'
                    }
                }}>Pausa Longa</Button>
            </Box>

            {/* Título da Tarefa */}
            <Typography variant="body1" sx={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>
                {selectedTask ? selectedTask.title : 'Selecione uma tarefa'}
            </Typography>

            {/* Timer */}
            <Typography variant="h2" sx={{
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                fontSize: '12vh'
            }}>
                {formatTime(timeLeft)}
            </Typography>

            {/* Barra de progresso */}
            <LinearProgress 
                variant="determinate" 
                value={progress}
                sx={{
                    width: '60%',
                    height: 6,
                    borderRadius: 5,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: 'white',
                    }
                }} 
            />

            {/* Botões de controle */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2
            }}>
                <IconButton onClick={handleReset} disabled={isRunning}>
                    <ReplayIcon sx={{ color: 'white' }} />
                </IconButton>
                <Button 
                    variant="contained" 
                    onClick={handleStartPause}
                    sx={{ 
                        bgcolor: 'white', 
                        color: bgColors[modo],
                        "&:hover": {
                            bgcolor: 'rgba(255,255,255,0.9)'
                        }
                    }}
                >
                    {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
                    {isRunning ? 'Pausar' : 'Iniciar'}
                </Button>
                <IconButton onClick={handleSkip} disabled={isRunning}>
                    <SkipNextIcon sx={{ color: 'white' }} />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Timer;