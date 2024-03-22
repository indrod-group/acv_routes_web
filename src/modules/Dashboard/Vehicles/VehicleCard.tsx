import React from 'react';
import { Card, Button } from 'antd';

const VehicleDataCard: React.FC = () => {
  return (
    <Card title="Vehicle Data" className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">License Plate:</div>
        <p className="mt-2 text-gray-500">XYZ 123</p>
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">VIN:</div>
        <p className="mt-2 text-gray-500">1HGCM82633A123456</p>
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Fuel Type:</div>
        <p className="mt-2 text-gray-500">Diesel</p>
      </div>
      <div className="flex items-center justify-end p-8">
        <Button type="primary">Update Info</Button>
      </div>
    </Card>
  );
};

export default VehicleDataCard;
