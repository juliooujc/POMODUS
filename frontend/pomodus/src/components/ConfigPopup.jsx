import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  TextField,
  Switch
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
          <TextField label="Pomodoro" type="number" defaultValue={25} size="small"
            sx={{ bgcolor: "white.basic", borderRadius: 1 }} />
          <TextField label="Pausas Curtas" type="number" defaultValue={5} size="small"
            sx={{ bgcolor: "white.basic", borderRadius: 1 }} />
          <TextField label="Pausas Longas" type="number" defaultValue={15} size="small"
            sx={{ bgcolor: "white.basic", borderRadius: 1 }} />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} gap={2}>
          <TextField label="Intervalo Pausa Longa" type="number" defaultValue={4} size="small"
            sx={{ bgcolor: "white.basic", borderRadius: 1 }} />
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">Auto Check Tarefa</Typography>
            <Switch checked={autoCheck} onChange={(e) => setAutoCheck(e.target.checked)} />
          </Box>
        </Box>

        {/* Botões */}
        <Box display="flex" gap={2}>
          <Button variant="contained" sx={{ bgcolor: "primary", color: "white.basic" }}>
            Salvar
          </Button>
          <Button variant="text" sx={{ color: "primary" }}>
            Restaurar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfigPopup;
