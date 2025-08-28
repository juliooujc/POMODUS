import { Box, Button, IconButton, Typography, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTimer } from "../contexts/TimerContext";
import ReplayIcon from '@mui/icons-material/Replay';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const Timer = ({ selectedTask, onTimerComplete, autoCheckTask, onTaskComplete }) => {
    const [modo, setModo] = useState('pomodoro');
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [cicloCount, setCicloCount] = useState(1);
    const [showCompletionDialog, setShowCompletionDialog] = useState(false);
    const [completedCycles, setCompletedCycles] = useState(0);
    const intervalRef = useRef(null);
    const { user } = useAuth();
    const { timeConfig } = useTimer();

    const [taskCompleted, setTaskCompleted] = useState(false);

    const bgColors = {
        pomodoro: "#BA4949",
        pausaCurta: "#73c765ff",
        pausaLonga: "#58A6F0"
    };

    const getTargetCycles = () => {
        if (selectedTask) {
            return selectedTask.total > 0 ? selectedTask.total : (selectedTask.progress || 0);
        }
        return 0;
    };

    const getCurrentCycles = () => {
        if (selectedTask) {
            return (selectedTask.progress || 0) + completedCycles;
        }
        return completedCycles;
    };

    useEffect(() => {
        if (selectedTask) {
            // Reseta o timer e volta para o modo pomodoro
            setIsRunning(false);
            setModo('pomodoro');
            setTimeLeft(timeConfig.pomodoro);
            setProgress(0);

            // Mantenha os resets que você já tinha
            setCompletedCycles(0);
            setCicloCount(0);
            setShowCompletionDialog(false);
        }
    }, [selectedTask, timeConfig.pomodoro]);

    useEffect(() => {
        if (selectedTask) {
            // Reseta o timer e volta para o modo pomodoro
            setIsRunning(false);
            setModo('pomodoro');
            setTimeLeft(timeConfig.pomodoro);
            setProgress(0);

            // Reseta os estados de ciclo e conclusão
            setCompletedCycles(0);
            setCicloCount(0);
            setShowCompletionDialog(false);
            setTaskCompleted(false); // Reativa o timer para nova tarefa
        }
    }, [selectedTask, timeConfig.pomodoro]);

    useEffect(() => {
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
        setTimeLeft(timeConfig[modo]);
        setProgress(0);
    };

    const handleSkip = () => {
        handleTimerComplete();
    };

    const checkTaskCompletion = () => {
        const targetCycles = getTargetCycles();
        if (targetCycles > 0) {
            if (getCurrentCycles() + 1 >= targetCycles) {
                setShowCompletionDialog(true);
                setTaskCompleted(true); // Desabilita o timer
                return true;
            }
        }
        return false;
    };

    const handleTimerComplete = async () => {
        if (taskCompleted) return; // Impede execução se tarefa concluída

        setIsRunning(false);

        let nextMode;
        let shouldIncrementCycle = false;

        if (modo === 'pomodoro') {
            // Pomodoro completado - vai para pausa
            if ((cicloCount + 1) % timeConfig.intervaloPausaLonga === 0) {
                nextMode = 'pausaLonga';
            } else {
                nextMode = 'pausaCurta';
            }

            // Registrar pomodoro no backend
            if (selectedTask) {
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

        } else if (modo === 'pausaCurta' || modo === 'pausaLonga') {
            // Pausa completada - volta para pomodoro E INCREMENTA O CICLO
            nextMode = 'pomodoro';
            shouldIncrementCycle = true;
        }

        // Notificar usuário
        if (Notification.permission === 'granted') {
            new Notification(modo === 'pomodoro' ? 'Pomodoro concluído!' : 'Pausa concluída!');
        }

        // Mudar para o próximo modo automaticamente
        setTimeout(() => {
            // incrimenta o ciclo apenas quando voltra prro pomodoro
            if (shouldIncrementCycle) {
                const newCycleCount = cicloCount + 1;
                setCicloCount(newCycleCount);
                setCompletedCycles(prev => prev + 1);

                // Verificar se a tarefa foi concluída APÓS incrementar
                if (checkTaskCompletion()) {
                    return;
                }
            }

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

    useEffect(() => {
        if (showCompletionDialog) {
            const audio = new Audio('/interface/notify.mp3'); // caminho do arquivo
            audio.play().catch((error) => {
                console.log("Erro ao tocar som:", error);
            });
            // bota pra deixar tarefa concluida aí pode pegar kkkk
        }
    }, [showCompletionDialog]);

    const handleCloseDialog = () => {
        setShowCompletionDialog(false);
        handleReset();
    };


    return (
        <>
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
                    {selectedTask ? (
                        `Ciclo ${taskCompleted ? getTargetCycles() : getCurrentCycles() + 1}/${getTargetCycles()}`
                    ) : (
                        `Ciclo ${cicloCount + 1}`
                    )}
                </Typography>

                {/* Botões de modo */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <Button variant="text" size="small" onClick={HandlePomodoro} disabled={taskCompleted} sx={{
                        textTransform: 'capitalize',
                        color: (modo === 'pomodoro') ? bgColors[modo] : 'white.basic',
                        bgcolor: (modo === 'pomodoro') ? 'white.basic' : 'transparent',
                        opacity: taskCompleted ? 0.5 : 1,
                        "&:hover": {
                            bgcolor: taskCompleted ? 'transparent' : (modo === 'pomodoro') ? 'white.basic' : 'rgba(255,255,255,0.1)'
                        }
                    }}>Pomodoro</Button>
                    <Button variant="text" size="small" onClick={handlePausaCurta} disabled={taskCompleted} sx={{
                        textTransform: 'capitalize',
                        color: (modo === 'pausaCurta') ? bgColors[modo] : 'white.basic',
                        bgcolor: (modo === 'pausaCurta') ? 'white.basic' : 'transparent',
                        opacity: taskCompleted ? 0.5 : 1,
                        "&:hover": {
                            bgcolor: taskCompleted ? 'transparent' : (modo === 'pausaCurta') ? 'white.basic' : 'rgba(255,255,255,0.1)'
                        }
                    }}>Pausa Curta</Button>
                    <Button variant="text" size="small" onClick={handlePausaLonga} disabled={taskCompleted} sx={{
                        textTransform: 'capitalize',
                        color: (modo === 'pausaLonga') ? bgColors[modo] : 'white.basic',
                        bgcolor: (modo === 'pausaLonga') ? 'white.basic' : 'transparent',
                        opacity: taskCompleted ? 0.5 : 1,
                        "&:hover": {
                            bgcolor: taskCompleted ? 'transparent' : (modo === 'pausaLonga') ? 'white.basic' : 'rgba(255,255,255,0.1)'
                        }
                    }}>Pausa Longa</Button>
                </Box>

                {/* Título da Tarefa */}
                <Typography variant="body1" sx={{
                    color: 'white.basic',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    {selectedTask ? selectedTask.titulo : 'Selecione uma tarefa'}
                    {taskCompleted && ' concluído(a)!'}
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
                    <IconButton onClick={handleReset} disabled={isRunning || taskCompleted}>
                        <ReplayIcon sx={{ color: taskCompleted ? 'rgba(255,255,255,0.5)' : 'white.basic' }} />
                    </IconButton>
                    <Button
                        variant="contained"
                        onClick={handleStartPause}
                        disabled={taskCompleted}
                        sx={{
                            bgcolor: taskCompleted ? 'rgba(255,255,255,0.5)' : 'white.basic',
                            color: bgColors[modo],
                            "&:hover": {
                                bgcolor: taskCompleted ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.9)'
                            }
                        }}
                    >
                        {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
                        {isRunning ? 'Pausar' : taskCompleted ? 'Concluído' : 'Iniciar'}
                    </Button>
                    <IconButton onClick={handleSkip} disabled={isRunning || taskCompleted}>
                        <SkipNextIcon sx={{ color: taskCompleted ? 'rgba(255,255,255,0.5)' : 'white.basic' }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Diálogo de conclusão */}
            <Dialog open={showCompletionDialog} onClose={handleCloseDialog} >
                <DialogTitle>🎉 Tarefa Concluída!</DialogTitle>
                <DialogContent>
                    <Typography>
                        Parabéns! Você completou todos os {getTargetCycles()} ciclos da tarefa "{selectedTask?.titulo}".
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Timer;