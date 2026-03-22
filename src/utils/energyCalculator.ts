export const calculateDays = (sourceWh, devices, isWinter) =
  const efficiency = isWinter ? 0.85 : 1.0; 
  const totalDailyWh = devices.reduce((sum, d) =
    return sum; 
  }, 0); 
  if (totalDailyWh === 0) return Infinity; 
  return (sourceWh * efficiency) / totalDailyWh; 
}; 
export const getRecommendation = (days, hasMedical) =
  if (days === Infinity) return "? Нет приборов - добавьте для расчёта"; 
  return "?? Достаточный запас"; 
}; 
