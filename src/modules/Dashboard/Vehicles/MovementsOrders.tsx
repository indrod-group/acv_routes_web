import React from 'react';
import { Card, Table } from 'antd';

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Destination',
    dataIndex: 'destination',
    key: 'destination',
  },
  {
    title: 'Purpose',
    dataIndex: 'purpose',
    key: 'purpose',
  },
  {
    title: 'Responsible',
    dataIndex: 'responsible',
    key: 'responsible',
  },
];

const data = [
  {
    key: '1',
    date: '01/15/2024',
    destination: 'Los Angeles',
    purpose: 'Delivery',
    responsible: 'John Doe',
  },
  {
    key: '2',
    date: '12/20/2023',
    destination: 'New York',
    purpose: 'Transport',
    responsible: 'Jane Doe',
  },
  {
    key: '3',
    date: '11/30/2023',
    destination: 'Chicago',
    purpose: 'Service',
    responsible: 'John Doe',
  },
];

const MovementOrdersCard: React.FC = () => {
  return (
    <Card title="Movement Orders" className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default MovementOrdersCard;
