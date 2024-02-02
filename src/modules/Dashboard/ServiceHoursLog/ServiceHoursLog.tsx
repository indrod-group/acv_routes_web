import { useState, useCallback } from 'react';
import ChartLog from './ChartLog';

import { DeviceList } from './Devices';
import { DatePicker, Card, Alert, Button, Tabs, Layout } from 'antd';
import dayjs from 'dayjs';
import { AlarmTable } from './AlarmTable';
import { useAlarms } from '../../../api/hooks';
import DeviceDescription from './DeviceDescription';
import TimeLineAlarms from './TimeLine';
import type { Device } from '../../../api/models';
import ServiceHoursRecord from './ModuleForPrint';

const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

export default function ServiceHoursLogModule() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { alarms } = useAlarms({
    imei: selectedDevice ? selectedDevice.imei : null,
    startTime: startDate ? Math.floor(startDate.getTime() / 1000) : null,
    endTime: endDate ? Math.floor(endDate.getTime() / 1000) : null
  });

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
  };

  const disabledDate = (current: dayjs.Dayjs | null): boolean => {
    // Can not select days before today and today
    return current ? current > dayjs().endOf('day') : false;
  }

  const setEndDateToNow = useCallback(() => {
    setEndDate(new Date());
    setStartDate(new Date(new Date().setHours(0, 0, 0, 0)));
  }, []);

  return (
    <Layout className="site-layout">
      <Header className="flex top-0 w-full  items-center justify-center print:block">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
          Bitácora de horas de servicio
        </h2>
      </Header>
      <Content>
        <Card>
          <Tabs className="print:hidden" defaultActiveKey="1">
            <TabPane tab="Dispositivos" key="1">
              <DeviceList onDeviceSelect={handleDeviceSelect} />
            </TabPane>
            <TabPane tab="Gráfica de movimiento" key="2">
              {selectedDevice && startDate && endDate && alarms && alarms.length > 0 ? (
                <ChartLog selectedDevice={selectedDevice} alarms={alarms} startDate={startDate} endDate={endDate} />
              ) : (
                <Alert message="No hay datos que graficar." type="warning" showIcon />
              )}
              <DeviceDescription selectedDevice={selectedDevice} />
              <Card className="p-4 print:block">
                <div className="flex space-x-4 items-center">
                  <p>Fecha inicial:</p>
                  <DatePicker
                    showTime value={dayjs(startDate)}
                    onChange={(date) => setStartDate(date ? date.toDate() : null)}
                    onOk={(date) => setStartDate(date ? date.toDate() : null)}
                    showNow={false}
                    className="border p-2 rounded text-black"
                  />
                  <p>Fecha final:</p>
                  <DatePicker
                    showTime value={dayjs(endDate)}
                    onChange={(date) => setEndDate(date ? date.toDate() : null)}
                    disabledDate={disabledDate}
                    onOk={(date) => setEndDate(date ? date.toDate() : null)}
                    showNow={true}
                    className="border p-2 rounded text-black"
                  />
                  <Button onClick={setEndDateToNow}>Seleccionar fecha y hora actual</Button>
                </div>
              </Card>
            </TabPane>
            <TabPane tab="Alarmas del dispositivo" key="3">
              {selectedDevice && startDate && endDate && alarms && alarms.length > 0 ? (
                <AlarmTable alarms={alarms} />
              ) : (
                <Alert message="No existen alarmas registradas. Por favor, seleccione un dispositivo u otro intervalo de tiempo." type="info" showIcon />
              )}
            </TabPane>
            <TabPane tab="Línea de tiempo" key="4">
              <TimeLineAlarms alarms={alarms} />
            </TabPane>
          </Tabs>
          <ServiceHoursRecord
            selectedDevice={selectedDevice}
            startDate={startDate}
            endDate={endDate}
            alarms={alarms}
          />
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
