import React from 'react';
import { Card, Button } from 'antd';

const BatteryCard: React.FC = () => {
  return (
    <Card title="Battery" className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Number of Batteries:</span>
          <span>2</span>
        </div>
        {[1, 2].map((battery, index) => (
          <div key={`${battery}-${index}`} className="flex items-center justify-between mb-4">
            <span className="font-medium">Battery {battery}:</span>
            <span>Good (Added on 01/01/2023)</span>
            <Button type="primary" className="ml-2">Replace</Button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between p-8">
        <Button type="primary">Add Battery</Button>
        <Button type="text">View Past Batteries</Button>
      </div>
    </Card>
  );
};

export default BatteryCard;
