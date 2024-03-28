import { Alert, Card } from "antd";
import type { Alarm, Device } from "../../../../api/models";
import ChartLog from "./../ChartLog";
import DeviceDescription from "./../DeviceDescription";
import TimeLineAlarms from "./../TimeLine";
import { usePrintContext } from "./usePrintContext";

interface PrintableContentProps {
  selectedDevice: Device | null;
  startDate: Date | null;
  endDate: Date | null;
  alarms: Alarm[];
}

const PrintableContent = (props: PrintableContentProps) => {
  const { selectedDevice, startDate, endDate, alarms } = props;
  const { printTimeline } = usePrintContext();

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
      <div className={`print:${printTimeline ? 'block' : 'hidden'}`}>
        <TimeLineAlarms alarms={alarms} />
      </div>
    </div>
  );
}

export default PrintableContent;
