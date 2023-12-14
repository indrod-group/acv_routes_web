import { AlarmCodeToValue } from "../../../api/models/AlarmCodes";

// Defining the Data type as an array of arrays containing Date and number.
export type Data = [Date, number][][];

// The HandlerAlarmTimes interface which declares the methods that our handlers will implement.
interface HandlerAlarmTimes {
  setNext(handler: HandlerAlarmTimes): HandlerAlarmTimes;
  handle(request: { diff: number, currentAlarmCode: number, nextAlarmCode: number }): void;
}

// The AbstractHandlerAlarmTimes abstract class which implements the HandlerAlarmTimes interface.
abstract class AbstractHandlerAlarmTimes implements HandlerAlarmTimes {
  // The next handler in the chain of responsibility.
  private nextHandler: HandlerAlarmTimes | null = null;

  // Method to set the next handler in the chain.
  public setNext(handler: HandlerAlarmTimes): HandlerAlarmTimes {
    this.nextHandler = handler;
    return handler;
  }

  // The handle method which passes the request along the chain.
  public handle(request: { diff: number, currentAlarmCode: number, nextAlarmCode: number }): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

// The AccOnHandler class which extends the AbstractHandlerAlarmTimes and implements the handle method.
class AccOnHandler extends AbstractHandlerAlarmTimes {
  // The total time the alarm was on.
  public timeOn = 0;

  // The handle method which calculates the time the alarm was on.
  public handle(request: { diff: number, currentAlarmCode: number, nextAlarmCode: number }): void {
    const { diff, currentAlarmCode, nextAlarmCode } = request;
    const isOn = currentAlarmCode === AlarmCodeToValue.ACCON;
    const isNextOff = nextAlarmCode === AlarmCodeToValue.ACCOFF;
    const isNextOn = nextAlarmCode === AlarmCodeToValue.ACCON;

    if (isOn && (isNextOff || isNextOn)) {
      this.timeOn += diff;
    }

    super.handle(request);
  }
}

// The AccOffHandler class which extends the AbstractHandlerAlarmTimes and implements the handle method.
class AccOffHandler extends AbstractHandlerAlarmTimes {
  // The total time the alarm was off.
  public timeOff = 0;

  // The handle method which calculates the time the alarm was off.
  public handle(request: { diff: number, currentAlarmCode: number, nextAlarmCode: number }): void {
    const { diff, currentAlarmCode, nextAlarmCode } = request;
    const isOff = currentAlarmCode === AlarmCodeToValue.ACCOFF;
    const isNextOn = nextAlarmCode === AlarmCodeToValue.ACCON;
    const isNextOff = nextAlarmCode === AlarmCodeToValue.ACCOFF;

    if (isOff && (isNextOn || isNextOff)) {
      this.timeOff += diff;
    }

    super.handle(request);
  }
}

// The TimeDifferenceCalculator class which contains the static method calculateTimeDifferences.
export class TimeDifferenceCalculator {
  // The calculateTimeDifferences method which calculates the time differences using the chain of responsibility.
  static calculateTimeDifferences(data: Data): [number, number] {
    const accOnHandler = new AccOnHandler();
    const accOffHandler = new AccOffHandler();

    accOnHandler.setNext(accOffHandler);

    for (let i = 0; i < data[0].length - 1; i++) {
      const [date1, currentAlarmCode] = data[0][i];
      const [date2, nextAlarmCode] = data[0][i + 1];
      const diff = (date2.getTime() - date1.getTime()) / 1000;

      accOnHandler.handle({ diff, currentAlarmCode, nextAlarmCode });
    }

    return [accOnHandler.timeOn, accOffHandler.timeOff];
  }
}
