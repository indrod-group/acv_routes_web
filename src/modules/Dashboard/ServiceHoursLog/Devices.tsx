import { useState } from 'react';
import { Table, Card, Pagination } from 'antd';
import { useDevices } from '../../../api/hooks';
import { censoreIMEI, formatName } from './ChartUtils';
import { Device } from '../../../api/models/Device';

interface DeviceListProps {
  onDeviceSelect: (device: Device) => void;
}

const columns = [
  {
    title: 'IMEI',
    dataIndex: 'imei',
    key: 'imei',
    render: (imei: string) => censoreIMEI(imei)
  },
  {
    title: 'Nombre de usuario',
    dataIndex: 'user_name',
    key: 'user_name',
    render: (name: string) => formatName(name)
  },
  {
    title: 'Propietario',
    dataIndex: 'car_owner',
    key: 'car_owner',
    render: (name: string) => formatName(name) || 'N/A'
  },
  {
    title: 'Número de licencia',
    dataIndex: 'license_number',
    key: 'license_number',
    render: (license: string) => license || 'N/A'
  },
  {
    title: 'VIN',
    dataIndex: 'vin',
    key: 'vin',
    render: (vin: string) => vin || 'N/A'
  }
];

export const DeviceList = ({ onDeviceSelect }: DeviceListProps) => {
  const [selectedImei, setSelectedImei] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { devices } = useDevices();

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setItemsPerPage(pageSize);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDevices = devices.slice(startIndex, endIndex);

  return (
    <Card title={"Dispositivos monitoreados"} className="flex-col space-x-4 print:block">
      <Pagination
        className="mt-4 mb-4 mx-auto content-center"
        total={devices.length}
        current={currentPage}
        onChange={handlePageChange}
        defaultPageSize={itemsPerPage}
        showSizeChanger
        showTotal={(total, range) => (
          <span className="px-2 py-1">
            Mostrando {range[0]} - {range[1]} de {total} dispositivos
          </span>
        )}
      />
      <Table
        className="bg-white"
        dataSource={currentDevices}
        columns={columns}
        rowKey="imei"
        onRow={(record: Device) => ({
          onClick: () => { onDeviceSelect(record); setSelectedImei(record.imei); }
        })}
        rowClassName={(record: Device) => (record.imei === selectedImei ? 'bg-blue-200' : '')}
        pagination={false}
      />
    </Card>
  );
};