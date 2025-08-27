import { Box, Button, IconButton, Typography, LinearProgress } from "@mui/material"
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTimer } from "../contexts/TimerContext";
import ReplayIcon from '@mui/icons-material/Replay';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const Timer = ({ selectedTask, onTimerComplete }) => {
    const [modo, setModo] = useState('pomodoro');
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [cicloCount, setCicloCount] = useState(0);
    const [pomodoroCompletado, setPomodoroCompletado] = useState(false);
    const intervalRef = useRef(null);
    const { user } = useAuth();
    const { timeConfig } = useTimer();

    const bgColors = {
        pomodoro: "#BA4949",
        pausaCurta: "#73c765ff",
        pausaLonga: "#58A6F0"
    };

    // Efeito para atualizar o timeLeft quando timeConfig ou modo mudar
    useEffect(() => {
        // Só reseta se não estiver rodando
        if (!isRunning) {
            setTimeLeft(timeConfig[modo]);
            setProgress(0);
        }
    }, [timeConfig, modo]);

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
    }, [timeLeft, modo, timeConfig]);

    const handleStartPause = () => {
        setIsRunning(prev => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        // Reset para o tempo configurado do modo atual
        setTimeLeft(timeConfig[modo]);
        setProgress(0);
    };

    const handleSkip = () => {
        // Simula o término do tempo atual
        handleTimerComplete();
    };

    // Função para determinar o próximo modo baseado no ciclo
    const getNextMode = (currentMode, currentCiclo, intervaloLonga) => {
        if (currentMode === 'pomodoro') {
            // Verifica se é hora da pausa longa
            if ((currentCiclo + 1) % intervaloLonga === 0) {
                return 'pausaLonga';
            } else {
                return 'pausaCurta';
            }
        } else {
            // Depois de qualquer pausa, volta para pomodoro
            return 'pomodoro';
        }
    };

    const handleTimerComplete = async () => {
        setIsRunning(false);
        
        let nextMode;
        let newCicloCount = cicloCount;
        let shouldRegisterPomodoro = false;

        if (modo === 'pomodoro') {
            // Pomodoro completado - marca como completado mas não incrementa ciclo ainda
            setPomodoroCompletado(true);
            shouldRegisterPomodoro = true;
            
            // Determina próxima pausa
            if ((cicloCount + 1) % timeConfig.intervaloPausaLonga === 0) {
                nextMode = 'pausaLonga';
            } else {
                nextMode = 'pausaCurta';
            }

        } else if (modo === 'pausaCurta') {
            // Pausa curta completada - incrementa ciclo apenas agora
            if (pomodoroCompletado) {
                newCicloCount = cicloCount + 1;
                setCicloCount(newCicloCount);
                setPomodoroCompletado(false);
            }
            nextMode = 'pomodoro';
            
        } else if (modo === 'pausaLonga') {
            // Pausa longa completada - incrementa ciclo
            if (pomodoroCompletado) {
                newCicloCount = cicloCount + 1;
                setCicloCount(newCicloCount);
                setPomodoroCompletado(false);
            }
            nextMode = 'pomodoro';
        }

        // Registrar pomodoro no backend se necessário
        if (shouldRegisterPomodoro && selectedTask) {
            try {
                const response = await fetch('http://localhost:3001/api/pomodoros', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
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

        // Mudar para o próximo modo automaticamente
        setTimeout(() => {
            setModo(nextMode);
            setTimeLeft(timeConfig[nextMode]);
            setProgress(0);
            
            // Iniciar automaticamente o próximo timer
            setIsRunning(true);
        }, 1000);
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
            minWidth: { md: '70vh', xs: '39vh' }, 
            bgcolor: bgColors[modo], 
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: { md: 5, xs: 3 }
        }}>
            {/* Contador de ciclos */}
            <Typography variant="body2" sx={{
                color: 'white.basic',
                opacity: 0.8,
                fontSize: '0.9rem'
            }}>
                Ciclo {cicloCount + 1} • Próxima pausa longa: {timeConfig.intervaloPausaLonga - (cicloCount % timeConfig.intervaloPausaLonga)}
                {pomodoroCompletado && " • Pomodoro concluído!"}
            </Typography>

            {/* Botões de modo */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2
            }}>
                <Button variant="text" size="small" onClick={HandlePomodoro} sx={{
                    textTransform: 'capitalize',
                    color: (modo === 'pomodoro') ? bgColors[modo] : 'white.basic',
                    bgcolor: (modo === 'pomodoro') ? 'white.basic' : 'transparent',
                    "&:hover": {
                        bgcolor: (modo === 'pomodoro') ? 'white.basic' : 'rgba(255,255,255,0.1)'
                    }   
                }}>Pomodoro</Button>
                <Button variant="text" size="small" onClick={handlePausaCurta} sx={{
                    textTransform: 'capitalize',
                    color: (modo === 'pausaCurta') ? bgColors[modo] : 'white.basic',
                    bgcolor: (modo === 'pausaCurta') ? 'white.basic' : 'transparent',
                    "&:hover": {
                        bgcolor: (modo === 'pausaCurta') ? 'white.basic' : 'rgba(255,255,255,0.1)'
                    }
                }}>Pausa Curta</Button>
                <Button variant="text" size="small" onClick={handlePausaLonga} sx={{
                    textTransform: 'capitalize',
                    color: (modo === 'pausaLonga') ? bgColors[modo] : 'white.basic',
                    bgcolor: (modo === 'pausaLonga') ? 'white.basic' : 'transparent',
                    "&:hover": {
                        bgcolor: (modo === 'pausaLonga') ? 'white.basic' : 'rgba(255,255,255,0.1)'
                    }
                }}>Pausa Longa</Button>
            </Box>

            {/* Título da Tarefa */}
            <Typography variant="body1" sx={{
                color: 'white.basic',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>
                {selectedTask ? selectedTask.title : 'Selecione uma tarefa'}
            </Typography>

            {/* Timer */}
            <Typography variant="h2" sx={{
                color: 'white.basic',
                fontWeight: 'bold',
                fontFamily: 'cursive',
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
                        backgroundColor: 'white.basic',
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
                    <ReplayIcon sx={{ color: 'white.basic' }} />
                </IconButton>
                <Button 
                    variant="contained" 
                    onClick={handleStartPause}
                    sx={{ 
                        bgcolor: 'white.basic', 
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
                    <SkipNextIcon sx={{ color: 'white.basic' }} />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Timer;