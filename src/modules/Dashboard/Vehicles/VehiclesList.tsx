import React, { useState } from 'react';
import { List, Pagination, Typography } from 'antd';
import { useVehicles } from '../../../api/hooks';

const VehicleList: React.FC = () => {
  const { vehicles } = useVehicles();

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
  const currentVehicles = vehicles.slice(startIndex, endIndex).map((alarm) => ({
    ...alarm, key: alarm.vuid
  }));

  return (
    <>
      <Pagination
        className="mt-4 mb-4 mx-auto"
        total={vehicles.length}
        current={currentPage}
        onChange={handlePageChange}
        defaultPageSize={itemsPerPage}
        showSizeChanger
        showTotal={(total, range) => (
          <span className="px-2 py-1">
            Mostrando {range[0]} - {range[1]} de {total} vehículos
          </span>
        )}
      />
      <List
        bordered
        itemLayout="horizontal"
        dataSource={currentVehicles}
        pagination={false}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<Typography.Text>{item.vehicle_type.brand} {item.vehicle_type.model}</Typography.Text>}
              description={
                <>
                  <p>VUID: {item.vuid}</p>
                  <p>Color: {item.color}</p>
                  <p>Chasis: {item.chassis}</p>
                  <p>Tonelaje: {item.tonnage}</p>
                  <p>Placa: {item.plate}</p>
                  <p>VIN: {item.vin}</p>
                  <p>IMEI del dispositivo: {item.device?.imei}</p>
                  <p>Año: {item.vehicle_type.year}</p>
                  <p>Marca: {item.vehicle_type.brand}</p>
                  <p>Modelo: {item.vehicle_type.model}</p>
                  <p>Versión: {item.vehicle_type.version}</p>
                  <p>Tipo de combustible: {item.vehicle_type.fuel_type}</p>
                  <p>Consumo en ciudad: {item.vehicle_type.city_mileage} km/l</p>
                  <p>Consumo en carretera: {item.vehicle_type.highway_mileage} km/l</p>
                  <p>Consumo mixto: {item.vehicle_type.mixed_mileage} km/l</p>
                </>
              }
            />
          </List.Item>
        )}
      />
    </>

  );
};

export default VehicleList;
