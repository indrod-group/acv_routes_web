import type { Alarm } from '../../../Entities';
import { AlarmCode, options, AlarmCodeToValue } from '../../../Entities/AlarmCodes';

export const getStatusLabel = (option: number): string => {
  return options[option] ?? 'Desconexión';
}

const createLastAlarm = (alarm: Alarm, startDate: Date): [Date, number] => {
  if (alarm.alarm_code === "ACCON") {
    return [startDate, AlarmCodeToValue.ACCOFF];
  }
  return [startDate, AlarmCodeToValue.ACCON];
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
      const value = AlarmCodeToValue[alarm.alarm_code]
      myMap.set(date, value);
      lastAlarm = alarm;
    }
  });

  if (lastAlarm !== null) {
    myMap.set(endDate || new Date(), (lastAlarm as Alarm).alarm_code === "ACCON" ? AlarmCodeToValue.ACCON : AlarmCodeToValue.ACCOFF);
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

const WIDTH_THRESHOLD = 800;

const TICK_VALUES = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FIVE: 5,
  TWELVE: 12,
  FOURTEEN: 14,
  FIFTEEN: 15,
  TWENTY_FOUR: 24,
  THIRTY: 30,
  SIXTY: 60,
  ONE_TWENTY: 120,
  TWO_FORTY: 240,
  SEVEN_TWENTY: 720,
  ONE_FOUR_FOUR_ZERO: 1440,
  TWO_EIGHT_EIGHT_ZERO: 2880,
};

export const getTicks = (width: number, time: number): number => {
  const [days, hours, minutes] = getTimes(time);
  if (width <= WIDTH_THRESHOLD) {
    if (hours === TICK_VALUES.ZERO && days === TICK_VALUES.ZERO) {
      return TICK_VALUES.FIVE;
    }
    if (days === TICK_VALUES.ZERO) {
      return TICK_VALUES.TWELVE <= hours && hours <= TICK_VALUES.TWENTY_FOUR ? TICK_VALUES.SIXTY : TICK_VALUES.THIRTY;
    }
    if (days === TICK_VALUES.ONE || days === TICK_VALUES.TWO || days === TICK_VALUES.THREE) {
      return TICK_VALUES.TWO_FORTY;
    }
    if (days > TICK_VALUES.THREE && days < TICK_VALUES.FOURTEEN) {
      return TICK_VALUES.ONE_FOUR_FOUR_ZERO;
    }
    if (days >= TICK_VALUES.FOURTEEN) {
      return TICK_VALUES.TWO_EIGHT_EIGHT_ZERO;
    }
  } else {
    if (hours === TICK_VALUES.ZERO && days === TICK_VALUES.ZERO) {
      return minutes < TICK_VALUES.THIRTY ? TICK_VALUES.ONE : TICK_VALUES.FIVE;
    }
    if (days === TICK_VALUES.ZERO) {
      return TICK_VALUES.TWELVE <= hours && hours <= TICK_VALUES.TWENTY_FOUR ? TICK_VALUES.THIRTY : TICK_VALUES.FIFTEEN;
    }
    if (days === TICK_VALUES.ONE || days === TICK_VALUES.TWO || days === TICK_VALUES.THREE) {
      return TICK_VALUES.ONE_TWENTY;
    }
    if (days > TICK_VALUES.THREE && days < TICK_VALUES.FOURTEEN) {
      return TICK_VALUES.SEVEN_TWENTY;
    }
    if (days >= TICK_VALUES.FOURTEEN) {
      return TICK_VALUES.ONE_FOUR_FOUR_ZERO;
    }
  }
  return TICK_VALUES.THIRTY;
}
