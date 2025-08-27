import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal, // Certifique-se que Modal está importado
  Typography,
  TextField,
  Switch
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTimer } from "../contexts/TimerContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {xs:300, md:400},
  bgcolor: "white.basic",
  color: "text.secondary",
  borderRadius: "12px",
  boxShadow: 24,
  p: 3,
};

const ConfigPopup = ({ open, onClose }) => {
  const [autoCheck, setAutoCheck] = useState(true);
  const { timeConfig, updateTimeConfig, resetTimeConfig } = useTimer();
  const [formValues, setFormValues] = useState({
    pomodoro: timeConfig.pomodoro / 60,
    pausaCurta: timeConfig.pausaCurta / 60,
    pausaLonga: timeConfig.pausaLonga / 60,
    intervaloPausaLonga: timeConfig.intervaloPausaLonga
  });

  // Atualizar formValues quando timeConfig mudar ou modal abrir
  useEffect(() => {
    if (open) {
      setFormValues({
        pomodoro: timeConfig.pomodoro / 60,
        pausaCurta: timeConfig.pausaCurta / 60,
        pausaLonga: timeConfig.pausaLonga / 60,
        intervaloPausaLonga: timeConfig.intervaloPausaLonga
      });
    }
  }, [open, timeConfig]);

  const handleInputChange = (field, value) => {
    const numericValue = Math.max(1, parseInt(value) || 1);
    setFormValues(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const handleSave = () => {
    updateTimeConfig({
      pomodoro: formValues.pomodoro * 60,
      pausaCurta: formValues.pausaCurta * 60,
      pausaLonga: formValues.pausaLonga * 60,
      intervaloPausaLonga: formValues.intervaloPausaLonga
    });
    onClose();
  };

  const handleRestore = () => {
    resetTimeConfig();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Botão de fechar */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white.basic",
          }}
        >
          <CloseIcon sx={{color:"text.primary"}} />
        </IconButton>

        {/* Título */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          Configurar tempo Pomodoro (em Minutos)
        </Typography>

        {/* Inputs */}
        <Box display="flex" gap={2} mb={2}>
          <TextField 
            label="Pomodoro" 
            type="number" 
            value={formValues.pomodoro}
            onChange={(e) => handleInputChange('pomodoro', e.target.value)}
            size="small"
            inputProps={{ min: 1 }}
            sx={{ bgcolor: "white.basic", borderRadius: 1 }} 
          />
          <TextField 
            label="Pausas Curtas" 
            type="number" 
            value={formValues.pausaCurta}
            onChange={(e) => handleInputChange('pausaCurta', e.target.value)}
            size="small"
            inputProps={{ min: 1 }}
            sx={{ bgcolor: "white.basic", borderRadius: 1 }} 
          />
          <TextField 
            label="Pausas Longas" 
            type="number" 
            value={formValues.pausaLonga}
            onChange={(e) => handleInputChange('pausaLonga', e.target.value)}
            size="small"
            inputProps={{ min: 1 }}
            sx={{ bgcolor: "white.basic", borderRadius: 1 }} 
          />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} gap={2}>
          <TextField 
            label="Intervalo Pausa Longa" 
            type="number" 
            value={formValues.intervaloPausaLonga}
            onChange={(e) => handleInputChange('intervaloPausaLonga', e.target.value)}
            size="small"
            inputProps={{ min: 1 }}
            sx={{ bgcolor: "white.basic", borderRadius: 1 }} 
          />
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">Auto Check Tarefa</Typography>
            <Switch checked={autoCheck} onChange={(e) => setAutoCheck(e.target.checked)} />
          </Box>
        </Box>

        {/* Botões */}
        <Box display="flex" gap={2}>
          <Button 
            variant="contained" 
            onClick={handleSave}
            sx={{ bgcolor: "primary", color: "white.basic" }}
          >
            Salvar
          </Button>
          <Button 
            variant="text" 
            onClick={handleRestore}
            sx={{ color: "primary" }}
          >
            Restaurar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfigPopup;