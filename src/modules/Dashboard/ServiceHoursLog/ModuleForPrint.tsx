import { useState } from 'react';
import { Alert, Card, Button, Switch } from "antd";
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

  const [printTimeline, setPrintTimeline] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className='print:hidden flex items-center justify-end space-x-4 sm:mt-0 sm:mb-0 md:mt-[-72px] md:mb-5'>
        <Switch
          checkedChildren="Imprimir línea de tiempo"
          unCheckedChildren="No imprimir línea de tiempo"
          checked={printTimeline}
          onChange={setPrintTimeline}
        />
        <Button onClick={handlePrint} type="primary">Imprimir</Button>
      </div>
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
    </>
  );
}

export default ServiceHoursRecord;
