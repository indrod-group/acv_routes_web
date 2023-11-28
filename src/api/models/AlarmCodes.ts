/**
 * Type for alarm codes.
 * Each key is a string representing the alarm code,
 * and each value is a string describing the alarm.
 */
export type AlarmCodeType = {
  [key: string]: string;
};

/**
 * Frozen object containing the alarm codes and their descriptions.
 */
export const AlarmCode: AlarmCodeType = Object.freeze({
  ACCOFF: "Apagado",
  ACCON: "Inicio",
  OFFLINETIMEOUT: "Tiempo de espera sin conexión",
  STAYTIMEOUT: "Tiempo de espera de estancia",
  REMOVE: "Desmontaje, sensor de luz, fallo de alimentación, enchufar y desenchufar",
  LOWVOT: "Baja electricidad",
  ERYA: "Segunda carga",
  FENCEIN: "Entrar en la cerca",
  FENCEOUT: "Fuera de la cerca",
  SEP: "Separado",
  SOS: "Alarma SOS",
  OVERSPEED: "Exceso de velocidad",
  HOME: "Residencia permanente anormal (casa)",
  COMPANY: "Residencia permanente anormal (empresa)",
  CRASH: "Alarma de colisión",
  SHAKE: "Vibración",
  ACCELERATION: "Aceleración rápida",
  DECELERATION: "Desaceleración rápida",
  TURN: "Giro brusco",
  FASTACCELERATION: "Aceleración máxima",
  SHARPTURN: "Giro brusco",
  TURNOVER: "Volcado",
  FASTDECELERATION: "Desaceleración rápida",
  REMOVECONTINUOUSLY: "Alarma de desmontaje continuo, alarma de sensor de luz y fallo de alimentación",
  SHIFT: "Alarma de movimiento",
  AREAOUT: "Alarma de salida de área",
  AREAIN: "Alarma de entrada a área",
  EXTERNALLOWBATTERY: "Alarma de baja tensión de la batería externa",
  XINHAOPINBI: "Alarma de bloqueo de señal",
  PSEUDOBASESTATION: "Alarma de estación base falsa",
  ONLINE: "Alarma en línea",
  ABNORMALACCUMULATION: "Alarma de acumulación anormal",
  RISKPLACE: "Alarma de permanencia en lugar de riesgo",
  VINMISMATCH: "Alarma de coincidencia incorrecta de VIN",
  SHORTMILES: "Alarma de kilometraje ultracorto",
  LONGMILES: "Alarma de kilometraje super largo",
  TRAIL: "Alarma de remolque",
  MULTIPLAYER: "Alarma de jugador múltiple",
  OPENCOVER: "Alarma de tapa abierta",
  POWERON: "Alarma de encendido",
  POWEROFF: "Alarma de apagado"
});
