import { Alert, Card } from "antd";
import type { Alarm, Device } from "../../../api/models";
import ChartLog from "./ChartLog";
import DeviceDescription from "./DeviceDescription";
import TimeLineAlarms from "./TimeLine";


interface ModuleForPrintProps {
  selectedDevice: Device | null;
  startDate: Date | null;
  endDate: Date | null;
  alarms: Alarm[];
}

const ServiceHoursRecord = (props: ModuleForPrintProps) => {
  const { selectedDevice, startDate, endDate, alarms } = props;
  
  return (
    <div className="hidden print:block">
    {selectedDevice && startDate && endDate && alarms && alarms.length > 0 ? (
      <ChartLog selectedDevice={selectedDevice} alarms={alarms} startDate={startDate} endDate={endDate} />
    ) : (
      <Alert message="No hay datos que graficar." type="warning" showIcon />
    )}
    <DeviceDescription selectedDevice={selectedDevice} />
    <Card className="p-4 print:block">
      <div className="flex space-x-4 items-center">
        <p>Fecha inicial: {startDate?.toUTCString()}</p>
        <p>Fecha final: {endDate?.toUTCString()}</p>
      </div>
    </Card>
    <TimeLineAlarms alarms={alarms} />
  </div>
  );
}

export default ServiceHoursRecord;