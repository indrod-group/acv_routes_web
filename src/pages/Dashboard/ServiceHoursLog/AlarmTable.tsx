import { useState } from 'react';
import { Table, Pagination, Card } from 'antd';
import { getAlarmCode } from './ChartUtils';
import { Alarm } from '../../../Entities';
import { Key, SortOrder } from 'antd/es/table/interface';

interface AlarmTableProps {
  alarms: Alarm[];
}


// Luego, crea una función para obtener los valores únicos de un campo específico
const getUniqueValues = <T extends Alarm>(data: T[], field: keyof T): (string | number)[] => {
  const values = data.map(item => item[field] === null ? "N/A" : item[field]);
  return [...new Set(values)] as (string | number)[];
};

// Utiliza esta función para generar los filtros
const generateFilters = <T extends Alarm>(data: T[], field: keyof T) => {
  const uniqueValues = getUniqueValues(data, field);
  return uniqueValues.map(value => ({ text: String(value), value: String(value) }));
};

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


  const columns = [
    {
      title: 'Alarmas',
      dataIndex: 'alarm_code',
      key: 'alarm_code',
      filters: generateFilters(alarms, 'alarm_code'),
      onFilter: (value: boolean | Key, record: Alarm) => (record.alarm_code as string).indexOf(value as string) === 0,
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
      filters: generateFilters(alarms, 'address'),
      onFilter: (value: boolean | Key, record: Alarm) => (record.address ?? "N/A").indexOf(value as string ?? "N/A" ) === 0,
      sorter: (a: Alarm, b: Alarm) => (a.address ?? "N/A").localeCompare(b.address ?? "N/A"),
      sortDirections: ['descend', 'ascend'] as SortOrder[],
      render: (address: string | null) => address ?? 'N/A'
    },
    {
      title: 'Velocidad',
      dataIndex: 'speed',
      key: 'speed',
      filters: generateFilters(alarms, 'speed'),
      onFilter: (value: boolean | Key, record: Alarm) => (record.speed === null ? "N/A" : (record.speed).toString()).indexOf(value as string ?? "N/A" ) === 0,
      sorter: (a: Alarm, b: Alarm) => (a.speed ?? 0) - (b.speed ?? 0),
      sortDirections: ['descend', 'ascend'] as SortOrder[],
      render: (speed: number | null) => speed != null ? `${speed} km/h` : 'N/A'
    },
    {
      title: 'Giro',
      dataIndex: 'course',
      key: 'course',
      filters: generateFilters(alarms, 'course'),
      onFilter: (value: boolean | Key, record: Alarm) => (record.course === null ? "N/A" : (record.course).toString()).indexOf(value as string ?? "N/A" ) === 0,
      sorter: (a: Alarm, b: Alarm) => (a.course ?? 0) - (b.course ?? 0),
      sortDirections: ['descend', 'ascend'] as SortOrder[],
      render: (course: number | null) => course != null ? `${course}°` : 'N/A'
    }
  ];

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
