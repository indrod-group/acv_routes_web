import { Card, Divider, Descriptions, Timeline, Typography, Alert } from 'antd';
import {
  AlertOutlined,
  ExclamationCircleOutlined,
  DashboardOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { getAlarmCode } from './ChartUtils';
import { Alarm } from '../../../api/models/Alarm';

interface TimeLineAlarmsProps {
  alarms: Alarm[];
}

type AlarmColorType = {
  [key: string]: string;
};

const alarmColors: AlarmColorType = Object.freeze({
  'ACCOFF': 'blue',
  'ACCON': 'green',
  'SOS': 'red',
  'REMOVE': 'yellow',
  'LOWVOT': 'yellow',
  'SHAKE': 'orange',
  'ACCELERATION': 'orange',
  'FASTACCELERATION': 'orange',
  'DECELERATION': 'orange',
  'FASTDECELERATION': 'orange',
  'OVERSPEED': 'orange',
  'SHARPTURN': 'orange',
  'TURNOVER': 'orange',
  'CRASH': 'orange',
});

const getDotColor = (alarm_code: string): string => {
  return alarmColors[alarm_code] || 'gray';
};

type AlarmIconType = {
  [key: string]: JSX.Element;
};

const alarmIcons: AlarmIconType = Object.freeze({
  'SOS': <AlertOutlined />,
  'REMOVE': <ThunderboltOutlined />,
  'LOWVOT': <ThunderboltOutlined />,
  'FASTACCELERATION': <DashboardOutlined />,
  'OVERSPEED': <DashboardOutlined />,
  'ACCELERATION': <DashboardOutlined />,
  'DECELERATION': <DashboardOutlined />,
  'FASTDECELERATION': <DashboardOutlined />,
  'SHARPTURN': <ExclamationCircleOutlined />,
  'CRASH': <ExclamationCircleOutlined />,
  'SHAKE': <ExclamationCircleOutlined />,
  'TURNOVER': <ExclamationCircleOutlined />
});

const getDotIcon = (alarm_code: string) => {
  return alarmIcons[alarm_code] || null;
}

const { Text } = Typography;

const TimeLineAlarms: React.FC<TimeLineAlarmsProps> = ({ alarms }) => {
  let currentDay: number | null = null;

  if (alarms === null || alarms.length === 0) {
    return <Alert
      message="No se puede crear la línea de tiempo sin datos."
      type="warning"
      showIcon
    />;
  }

  return (
    <Card title="Línea de tiempo">
      <Timeline mode="left">
        {alarms.map((alarm) => {
          const alarmDate = new Date(alarm.time * 1000);
          const isNewDay = currentDay !== alarmDate.getDate();
          currentDay = alarmDate.getDate();
          return (
            <>
              {isNewDay && (
                <Timeline.Item
                  key={`day-${currentDay}`}
                  label={alarmDate.toLocaleDateString()}
                  color="black"
                >
                  <Divider></Divider>
                </Timeline.Item>
              )}
              <Timeline.Item
                key={alarm.id}
                label={alarmDate.toLocaleTimeString()}
                color={getDotColor(alarm.alarm_code as string)}
                dot={getDotIcon(alarm.alarm_code as string)}
              >
                <Descriptions
                  title={
                    <Text className="font-normal" strong={false} >
                      {getAlarmCode(alarm.alarm_code as string)}
                    </Text>
                  }
                >
                  {alarm.speed && (
                    <Descriptions.Item label="Velocidad">
                      {alarm.speed} km/h
                    </Descriptions.Item>
                  )}
                  {alarm.course && (
                    <Descriptions.Item label="Ángulo de giro">
                      {alarm.course}°
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Timeline.Item>
            </>
          );
        })}
      </Timeline>
    </Card>
  );
};

export default TimeLineAlarms;
