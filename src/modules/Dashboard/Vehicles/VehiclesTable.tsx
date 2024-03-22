import React from 'react';
import { Table } from 'antd';
import { useVehicles } from '../../../api/hooks';
import { Vehicle } from '../../../api/models';

const columns = [
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
  },
  {
    title: 'Chasis',
    dataIndex: 'chassis',
    key: 'chassis',
  },
  {
    title: 'VIN',
    dataIndex: 'vin',
    key: 'vin',
    render: (vin: string) => vin || 'N/A'
  },
  {
    title: 'Año',
    key: 'year',
    render: (_: string, record: Vehicle) => record.vehicle_type.year,
  },
];

const VehicleTable: React.FC = () => {
  const { vehicles } = useVehicles();

  return (
    <div className="flex justify-center">
      <Table dataSource={vehicles} columns={columns} rowKey="vuid" />
    </div>
  );
};

export default VehicleTable;
