// VisorSemanas.js
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, getWeek, getYear } from 'date-fns';
import { es } from 'date-fns/locale';

const VisorSemanas = () => {
  const [currentWeek, setCurrentWeek] = useState([]);
  const [weekNumber, setWeekNumber] = useState(0);
  const [weeksInYear, setWeeksInYear] = useState([]);
  const [currentYear, setCurrentYear] = useState(getYear(new Date()));

  useEffect(() => {
    const currentDate = new Date();

    // Obtener el número de la semana actual
    const currentWeekNumber = getWeek(currentDate);
    setWeekNumber(currentWeekNumber);

    // Obtener el primer día del año
    const startOfYear = new Date(getYear(currentDate), 0, 1);

    // Generar semanas del año
    const weeks = [];
    for (let i = 0; i < 52; i++) {
      const startOfWeekDate = addDays(startOfWeek(startOfYear, { weekStartsOn: 1, locale: es }), i * 7);
      const endOfWeekDate = addDays(startOfWeekDate, 4); // Solo contar de lunes a viernes
      weeks.push({
        weekNumber: getWeek(startOfWeekDate),
        startDate: format(startOfWeekDate, 'dd MMMM yyyy', { locale: es }),
        endDate: format(endOfWeekDate, 'dd MMMM yyyy', { locale: es }),
      });
    }

    setWeeksInYear(weeks);

    // Obtener los días de la semana actual
    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1, locale: es });
    const daysOfWeek = [];
    for (let i = 0; i < 5; i++) {
      daysOfWeek.push(format(addDays(startOfCurrentWeek, i), 'dd MMMM yyyy', { locale: es }));
    }
    setCurrentWeek(daysOfWeek);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Semana Actual: {weekNumber < 10 ? `0${weekNumber}` : weekNumber} del año {currentYear}
      </h1>
      <div className="text-lg text-center text-gray-500 mb-6">
        {currentWeek[0]} - {currentWeek[4]}
      </div>
      <div className="space-y-4">
        {weeksInYear.map((week, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
            <span className="text-xl font-medium text-gray-700">{`Semana: ${week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber}`}</span>
            <span className="text-lg text-gray-500">{`${week.startDate} - ${week.endDate} del ${currentYear}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisorSemanas;
