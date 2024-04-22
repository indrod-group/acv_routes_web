import React from 'react';
import { Card, Button } from 'antd';

const TiresCard: React.FC = () => {
  return (
    <Card title="Tires" className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
      <div className="p-8">
        {['Front Left', 'Front Right', 'Rear Left', 'Rear Right'].map((tire, index) => (
          <div key={`${tire}-${index}`} className="flex items-center justify-between mb-4">
            <span className="font-medium">{tire}:</span>
            <span>Good (Added on 01/01/2023)</span>
            <Button type="primary" className="ml-2">Reemplazar</Button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between p-8">
        <Button type="primary" >Añadir llanta</Button>
        <Button type="text">Ver anteriores llantas</Button>
      </div>
    </Card>
  );
};

export default TiresCard;
