import React from 'react';
import { Card, Table } from 'antd';

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'Responsible',
    dataIndex: 'responsible',
    key: 'responsible',
  },
  {
    title: 'Inspection Code',
    dataIndex: 'inspectionCode',
    key: 'inspectionCode',
  },
];

const data = [
  {
    key: '1',
    date: '01/01/2024',
    service: 'Oil Change',
    cost: '$75',
    responsible: 'John Doe',
    inspectionCode: 'OC1234',
  },
  {
    key: '2',
    date: '12/01/2023',
    service: 'Tire Rotation',
    cost: '$50',
    responsible: 'Jane Doe',
    inspectionCode: 'TR5678',
  },
  {
    key: '3',
    date: '10/01/2023',
    service: 'Brake Check',
    cost: '$100',
    responsible: 'John Doe',
    inspectionCode: 'BC9101',
  },
];

const MaintenanceHistoryCard: React.FC = () => {
  return (
    <Card title="Maintenance History" className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default MaintenanceHistoryCard;
