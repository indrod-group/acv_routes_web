import { useState } from 'react';
import { Table, Pagination, Card } from 'antd';
import { getAlarmCode } from './ChartUtils';
import { Alarm } from '../../../api/models';
import { SortOrder } from 'antd/es/table/interface';

interface AlarmTableProps {
  alarms: Alarm[];
}


const columns = [
  {
    title: 'Alarmas',
    dataIndex: 'alarm_code',
    key: 'alarm_code',
    sorter: (a: Alarm, b: Alarm) => (a.alarm_code as string).localeCompare(b.alarm_code as string),
    sortDirections: ['descend', 'ascend'] as SortOrder[],
    render: (code: string) => getAlarmCode(code) || "Alarma Desconocida",
  },
  {
    title: 'Fecha y hora',
    dataIndex: 'time',
    key: 'time',
    sorter: (a: Alarm, b: Alarm) => a.time - b.time,
    sortDirections: ['descend', 'ascend'] as SortOrder[],
    render: (time: number) => new Date(time * 1000).toLocaleString()
  },
  {
    title: 'Latitud',
    dataIndex: 'lat',
    key: 'lat',
    sorter: (a: Alarm, b: Alarm) => (a.lat ?? "").localeCompare(b.lat ?? ""),
    sortDirections: ['descend', 'ascend'] as SortOrder[],
    render: (lat: string | null) => lat ?? 'N/A'
  },
  {
    title: 'Longitud',
    dataIndex: 'lng',
    key: 'lng',
    sorter: (a: Alarm, b: Alarm) => (a.lng ?? "").localeCompare(b.lng ?? ""),
    sortDirections: ['descend', 'ascend'] as SortOrder[],
    render: (lng: string | null) => lng ?? 'N/A'
  },
  {
    title: 'Dirección',
    dataIndex: 'address',
    key: 'address',
    sorter: (a: Alarm, b: Alarm) => (a.address ?? "").localeCompare(b.address ?? ""),
    sortDirections: ['descend', 'ascend'] as SortOrder[],
    render: (address: string | null) => address ?? 'N/A'
  },
  {
    title: 'Velocidad',
    dataIndex: 'speed',
    key: 'speed',
    sorter: (a: Alarm, b: Alarm) => (a.speed ?? 0) - (b.speed ?? 0),
    sortDirections: ['descend', 'ascend'] as SortOrder[],
    render: (speed: number | null) => speed != null ? `${speed} km/h` : 'N/A'
  },
  {
    title: 'Giro',
    dataIndex: 'course',
    key: 'course',
    sorter: (a: Alarm, b: Alarm) => (a.course ?? 0) - (b.course ?? 0),
    sortDirections: ['descend', 'ascend'] as SortOrder[],
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
