import { useState, useCallback, useEffect, useRef } from 'react';
import ChartLog from './ChartLog';

import { DeviceList } from './Devices';
import { DatePicker, Card, Alert, Button, Tabs, Layout, Divider, Select, InputNumber, message } from 'antd';
import dayjs from 'dayjs';
import { AlarmTable } from './AlarmTable';
import { useAlarms } from '../../../api/hooks';
import DeviceDescription from './DeviceDescription';
import TimeLineAlarms from './TimeLine';
import type { Device } from '../../../api/models';
import ServiceHoursRecord from './ModuleForPrint';

const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function ServiceHoursLogModule() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { alarms, fetchAlarms } = useAlarms({
    imei: selectedDevice ? selectedDevice.imei : null,
    startTime: startDate ? Math.floor(startDate.getTime() / 1000) : null,
    endTime: endDate ? Math.floor(endDate.getTime() / 1000) : null
  });

  const fetchAlarmsRef = useRef(fetchAlarms);

  useEffect(() => {
    fetchAlarmsRef.current = fetchAlarms;
  }, [fetchAlarms]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAlarmsRef.current();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [startDate, endDate, selectedDevice]);

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

  const [operation, setOperation] = useState('addBoth');
  const [amount, setAmount] = useState<number | null>(1);

  const adjustDates = (unit: dayjs.ManipulateType) => {
    if (!endDate || !startDate) {
      return;
    }
  
    let newStartDate = startDate;
    let newEndDate = endDate;
  
    switch (operation) {
      case 'addBoth':
        newStartDate = dayjs(startDate).add(amount ?? 1, unit).toDate();
        newEndDate = dayjs(endDate).add(amount ?? 1, unit).toDate();
        break;
      case 'addToStartDate':
        newStartDate = dayjs(startDate).add(amount ?? 1, unit).toDate();
        break;
      case 'addToEndDate':
        newEndDate = dayjs(endDate).add(amount ?? 1, unit).toDate();
        break;
      case 'subtractBoth':
        newStartDate = dayjs(startDate).subtract(amount ?? 1, unit).toDate();
        newEndDate = dayjs(endDate).subtract(amount ?? 1, unit).toDate();
        break;
      case 'subtractToStartDate':
        newStartDate = dayjs(startDate).subtract(amount ?? 1, unit).toDate();
        break;
      case 'subtractToEndDate':
        newEndDate = dayjs(endDate).subtract(amount ?? 1, unit).toDate();
        break;
    }
  
    if (dayjs(newStartDate).isBefore(newEndDate)) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    } else {
      void message.warning("La fecha de inicio no puede ser mayor que la fecha de fin");
      console.warn('La fecha de inicio no puede ser mayor que la fecha de fin');
    }
  };  

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
              <Card
               className="p-4 print:block"
               title="Intervalo de tiempo"
              >
                <div className="flex space-x-4 items-center">
                  <RangePicker
                    showTime
                    value={[dayjs(startDate), dayjs(endDate)]}
                    onChange={(dates) => {
                      setStartDate(dates ? (dates[0] as dayjs.Dayjs).toDate() : null);
                      setEndDate(dates ? (dates[1] as dayjs.Dayjs).toDate() : null);
                    }}
                    onOk={(dates) => {
                      setStartDate(dates ? (dates[0] as dayjs.Dayjs).toDate() : null);
                      setEndDate(dates ? (dates[1] as dayjs.Dayjs).toDate() : null);
                    }}
                    disabledDate={disabledDate}
                    className="border p-2 rounded text-black"
                  />
                  <Button onClick={setEndDateToNow}>Seleccionar fecha y hora actual</Button>
                </div>
                <Divider className="print:hidden"></Divider>
                <div className="flex space-x-4 items-center print:hidden">
                  <Select defaultValue="addBoth" onChange={setOperation}>
                    <Option value="addBoth">Sumar a ambas fechas</Option>
                    <Option value="addToStartDate">Sumar a la fecha inicial</Option>
                    <Option value="addToEndDate">Sumar a la fecha final</Option>
                    <Option value="subtractBoth">Restar a ambas fechas</Option>
                    <Option value="subtractToStartDate">Restar a la fecha inicial</Option>
                    <Option value="subtractToEndDate">Restar a la fecha final</Option>
                  </Select>
                  <InputNumber min={1} defaultValue={1} onChange={setAmount} />
                  <Button onClick={() => adjustDates('days')}>Ajustar días</Button>
                  <Button onClick={() => adjustDates('hours')}>Ajustar horas</Button>
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
