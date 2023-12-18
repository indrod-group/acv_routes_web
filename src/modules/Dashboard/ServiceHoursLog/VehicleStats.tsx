import { Card, Col, Row, Statistic, Popover, Space, Typography } from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone, CarTwoTone, ExclamationCircleTwoTone, HourglassTwoTone, NotificationTwoTone } from '@ant-design/icons';

import { filterAlarmsBy, getAlarmCode } from './ChartUtils';
import type { Alarm } from '../../../api/models';

interface VehicleStatsProps {
  timeOn: number;
  timeOff: number;
  numAlarms: number;
  numSpeeding: number;
  numIncidents: number;
  totalTravelTime: number;
  alarms: Alarm[] | null;
}

const formatTime = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * 24 * 60 * 60;
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * 60 * 60;
  const minutes = Math.floor(seconds / (60));
  seconds -= minutes * 60;
  seconds = Math.round(seconds);

  if (days === 0 && hours === 0) {
    return `${minutes}m:${seconds}s`;
  }

  if (days === 0) {
    return `${hours}h:${minutes}m:${seconds}s`;
  }

  return `${days}d:${hours}h:${minutes}m:${seconds}s`;
}

const getIncidentsTitle = (numIncidents: number): string => {
  return numIncidents === 0 ? "No ha habido incidentes." : "Incidentes detectados:";
}

const getIncidentsContent = (numIncidents: number, alarms: Alarm[] | null) => {
  if (numIncidents === 0) {
    return (
      <Space direction="vertical">
        <Typography.Paragraph>Ningún incidente se ha detectado</Typography.Paragraph>
      </Space>
    );
  }
  if (alarms !== null) {
    const incidents = filterAlarmsBy(alarms, ["REMOVE", "SOS", "LOWVOT"]);
    return (
      <Space direction="vertical">
        {incidents.map((incident, index) => {
          return (<Typography.Paragraph key={index}>{getAlarmCode(incident.alarm_code as string)} del dispositivo a las {new Date(incident.time * 1000).toLocaleString()}</Typography.Paragraph>)
        })}
      </Space>
    );
  }
  return (
    <Space direction="vertical">
      <Typography.Paragraph>No se ha podido verificar los incidentes.</Typography.Paragraph>
    </Space>
  );
}

const VehicleStats: React.FC<VehicleStatsProps> = ({ timeOn, timeOff, numAlarms, numSpeeding, numIncidents, totalTravelTime, alarms }) => (
  <Card>
    <Row gutter={16}>
      <Col span={8}>
        <Statistic
          title="Tiempo encendido"
          value={formatTime(timeOn)}
          prefix={<CheckCircleTwoTone twoToneColor="#52c41a" />}
        />
        <Statistic
          title="Tiempo apagado"
          value={formatTime(timeOff)}
          prefix={<ClockCircleTwoTone twoToneColor="#d9d9d9" />}
        />
      </Col>
      <Col span={8}>
        <Statistic
          title="Número de alarmas"
          value={numAlarms}
          prefix={<NotificationTwoTone twoToneColor="#faad14" />}
        />
        <Statistic
          title="Excesos de velocidad"
          value={numSpeeding}
          prefix={<CarTwoTone twoToneColor="#1890ff" />}
        />
      </Col>
      <Col span={8}>
        <Popover
          title={getIncidentsTitle(numIncidents)}
          content={getIncidentsContent(numIncidents, alarms)}
          trigger="hover"
        >
          <Statistic
            title="Número de incidentes"
            value={numIncidents}
            prefix={<ExclamationCircleTwoTone twoToneColor="#f5222d" />}
          />
        </Popover>
        <Statistic
          title="Horas totales de viaje"
          value={formatTime(totalTravelTime)}
          prefix={<HourglassTwoTone twoToneColor="#722ed1" />}
        />
      </Col>
    </Row>
  </Card>
);

export default VehicleStats;
