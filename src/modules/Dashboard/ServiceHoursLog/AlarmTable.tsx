import { useState } from 'react';
import { Table, Pagination, Card } from 'antd';
import { getAlarmCode } from './ChartUtils';
import { Alarm } from '../../../api/models';

interface AlarmTableProps {
  alarms: Alarm[];
}


const columns = [
  {
    title: 'Alarmas',
    dataIndex: 'alarm_code',
    key: 'alarm_code',
    render: (code: string) => getAlarmCode(code) || "Alarma Desconocida"
  },
  {
    title: 'Fecha y hora',
    dataIndex: 'time',
    key: 'time',
    render: (time: number) => new Date(time * 1000).toLocaleString()
  },
  {
    title: 'Latitud',
    dataIndex: 'lat',
    key: 'lat',
    render: (lat: string | null) => lat ?? 'N/A'
  },
  {
    title: 'Longitud',
    dataIndex: 'lng',
    key: 'lng',
    render: (lng: string | null) => lng ?? 'N/A'
  },
  {
    title: 'Dirección',
    dataIndex: 'address',
    key: 'address',
    render: (address: string | null) => address ?? 'N/A'
  },
  {
    title: 'Velocidad',
    dataIndex: 'speed',
    key: 'speed',
    render: (speed: number | null) => speed != null ? `${speed} km/h` : 'N/A'
  },
  {
    title: 'Giro',
    dataIndex: 'course',
    key: 'course',
    render: (course: number | null) => course != null ? `${course}°` : 'N/A'
  }
];

export const AlarmTable = ({ alarms }: AlarmTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setItemsPerPage(pageSize);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlarms = alarms.slice(startIndex, endIndex).map((alarm) => ({
    ...alarm, key: alarm.id
  }));

  return (
    <Card title={"Alarmas registradas del dispositivo"}>
      <Pagination
        className="mt-4 mb-4 mx-auto"
        total={alarms.length}
        current={currentPage}
        onChange={handlePageChange}
        defaultPageSize={itemsPerPage}
        showSizeChanger
        showTotal={(total, range) => (
          <span className="px-2 py-1">
            Mostrando {range[0]} - {range[1]} de {total} alarmas
          </span>
        )}
      />
      <Table
        className="bg-white rounded"
        dataSource={currentAlarms}
        columns={columns}
        pagination={false}
      />
    </Card>
  );
};
