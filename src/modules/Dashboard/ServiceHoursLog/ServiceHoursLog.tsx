import { useState, useEffect } from 'react';
import ChartLog from './ChartLog';

import { DeviceList } from './Devices';
import { Card, Alert, Layout, Tabs, type TabsProps } from 'antd';
import { AlarmTable } from './AlarmTable';
import { useAlarms } from '../../../api/hooks';
import DeviceDescription from './DeviceDescription';
import TimeLineAlarms from './TimeLine';
import type { Device } from '../../../api/models';
import DateRangePicker from './DateRangePicker';
import ChangePrintableContent from './PrintableContent/ChangePrintableContent';
import { PrintProvider } from './PrintableContent/PrintContext';
import PrintableContent from './PrintableContent/PrintableContent';

const { Header, Content, Footer } = Layout;

export default function ServiceHoursLogModule() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { alarms, fetchAlarms } = useAlarms({
    imei: selectedDevice ? selectedDevice.imei : null,
    startTime: startDate ? Math.floor(startDate.getTime() / 1000) : null,
    endTime: endDate ? Math.floor(endDate.getTime() / 1000) : null
  });

  useEffect(() => {
    fetchAlarms();
  }, [fetchAlarms]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Mis dispositivos',
      children: <DeviceList onDeviceSelect={setSelectedDevice} />
    },
    {
      key: '2',
      label: 'Gráfica',
      children: <>
        {selectedDevice && startDate && endDate && alarms && alarms.length > 0 ? (
          <ChartLog selectedDevice={selectedDevice} alarms={alarms} startDate={startDate} endDate={endDate} />
        ) : (
          <Alert message="No hay datos que graficar." type="warning" showIcon />
        )}
        <DeviceDescription selectedDevice={selectedDevice} />
        <Card
          className="p-4 print:hidden"
          title="Intervalo de tiempo"
        >
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </Card>
      </>
    },
    {
      key: '3',
      label: 'Alarmas registradas',
      children: <>
        {selectedDevice && startDate && endDate && alarms && alarms.length > 0 ? (
          <AlarmTable alarms={alarms} />
        ) : (
          <Alert message="No existen alarmas registradas. Por favor, seleccione un dispositivo u otro intervalo de tiempo." type="info" showIcon />
        )}</>
    },
    {
      key: '4',
      label: 'Línea de tiempo',
      children: <TimeLineAlarms alarms={alarms} />
    },
  ];

  return (
    <Layout className="site-layout">
      <PrintProvider>
        <Header className="flex sm:flex-row justify-between items-center print:block">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
            Bitácora de horas de servicio
          </h2>
          <ChangePrintableContent />
        </Header>
        <Content>
          <Card>
            <PrintableContent
              startDate={startDate}
              endDate={endDate}
              selectedDevice={selectedDevice}
              alarms={alarms}
            />
            <Tabs
              className='print:hidden'
              defaultActiveKey="1"
              items={items}
            />
          </Card>
        </Content>
      </PrintProvider>
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
