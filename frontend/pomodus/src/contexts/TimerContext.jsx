import React, { createContext, useContext, useState } from 'react';

const TimerContext = createContext();

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer deve ser usado dentro de um TimerProvider');
  }
  return context;
};

export const TimerProvider = ({ children }) => {
  const [timeConfig, setTimeConfig] = useState({
    pomodoro: 25 * 60,
    pausaCurta: 5 * 60,
    pausaLonga: 15 * 60,
    intervaloPausaLonga: 4
  });

  const updateTimeConfig = (newConfig) => {
    setTimeConfig(prev => ({ ...prev, ...newConfig }));
  };

  const resetTimeConfig = () => {
    setTimeConfig({
      pomodoro: 25 * 60,
      pausaCurta: 5 * 60,
      pausaLonga: 15 * 60,
      intervaloPausaLonga: 4
    });
  };

  return (
    <TimerContext.Provider value={{ 
      timeConfig, 
      updateTimeConfig, 
      resetTimeConfig 
    }}>
      {children}
    </TimerContext.Provider>
  );
};