import { Alarm } from '../../../api/models/Alarm';
import { AlarmCode } from '../../../api/models/AlarmCodes';

const options: Record<number, string> = Object.freeze({
  0: 'Desconexión',
  1: 'Apagado',
  2: 'Encendido',
  3: 'Descanso',
  4: 'Act. Auxiliares',
  5: 'Casos Excepcionales'
});

export const getStatusLabel = (option: number): string => {
  return options[option] ?? 'Desconexión';
}

const createLastAlarm = (alarm: Alarm, startDate: Date): [Date, number] => {
  if (alarm.alarm_code === "ACCON") {
    return [startDate, 1];
  }
  return [startDate, 2];
}

export const filterAlarmsBy = (alarms: Alarm[], keys: string[]): Alarm[] => {
  return alarms.filter(alarm => keys.includes(alarm.alarm_code as string));
}

export const getStatusData = (alarms: Alarm[], startDate: Date, endDate: Date): Map<Date, number> => {
  const myMap = new Map<Date, number>();
  if (alarms.length === 0) {
    return myMap;
  }

  let isTheFirstAlarm = true;
  let lastAlarm: Alarm | null = null;

  alarms.forEach(alarm => {
    if (alarm.alarm_code !== "ACCON" && alarm.alarm_code !== "ACCOFF") {
      return;
    } else {
      if (isTheFirstAlarm) {
        const values = createLastAlarm(alarm, startDate);
        myMap.set(...values);
        isTheFirstAlarm = false;
      }
      // Convierte el tiempo Unix de segundos a milisegundos.
      const date = new Date(alarm.time * 1000);
      const value = alarm.alarm_code === "ACCON" ? 2 : 1;
      myMap.set(date, value);
      lastAlarm = alarm;
    }
  });

  if (lastAlarm !== null) {
    myMap.set(endDate || new Date(), (lastAlarm as Alarm).alarm_code === "ACCON" ? 2 : 1);
  }

  return myMap;
}

export const censoreIMEI = (imei: string): string => {
  const firstTwoDigits = imei.slice(0, 2);
  const lastFourDigits = imei.slice(-4);
  return `${firstTwoDigits}****${lastFourDigits}`;
}

export const formatName = (name: string | null): string => {
  if (name === null) {
    return "";
  }

  let names: string[] = name.split(" ");
  if (names.length === 1) {
    return name;
  }

  names = names.map(name => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  });
  return names.join(" ");
}

export type Data = [Date, number][][];

export const calculateTimeDifferences = (data: Data): [number, number] => {
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < data[0].length - 1; i++) {
    const date1 = data[0][i][0];
    const date2 = data[0][i + 1][0];
    const diff = (date2.getTime() - date1.getTime()) / 1000;

    if (data[0][i][1] === 1) {
      sum1 += diff;
    } else {
      sum2 += diff;
    }
  }

  // Comprueba el primer número del array para determinar el orden de los resultados
  if (data?.[0]?.[0]?.[1] === 2) {
    return [sum1, sum2];
  } else {
    return [sum2, sum1];
  }  
}

export const getAlarmCode = (key: string): string => {
  const code = AlarmCode[key];
  if (code !== undefined) {
    return code;
  } else {
    throw new Error(`Invalid key: ${key}`);
  }
}

const getTimes = (seconds: number): [number, number, number] => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * 24 * 60 * 60;
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * 60 * 60;
  const minutes = Math.floor(seconds / (60));
  return [days, hours, minutes];
}

export const getTicks = (width: number, time: number): number => {
  const [days, hours, minutes] = getTimes(time);
  if (width <= 800) {
    if (hours === 0 && days === 0) {
      return 5;
    }
    if (days === 0) {
      return 12 <= hours && hours <= 24 ? 60 : 30;
    }
    if (days === 1 || days === 2 || days === 3) {
      return 240;
    }
    if (days > 3 || days < 14) {
      return 1440;
    }
    if (days >= 14) {
      return 2880;
    }
  } else {
    if (hours === 0 && days === 0) {
      return minutes < 30 ? 1 : 5;
    }
    if (days === 0) {
      return 12 <= hours && hours <= 24 ? 30 : 15;
    }
    if (days === 1 || days === 2 || days === 3) {
      return 120;
    }
    if (days > 3 || days < 14) {
      return 720;
    }
    if (days >= 14) {
      return 1440;
    }
  }
  return 30;
}
