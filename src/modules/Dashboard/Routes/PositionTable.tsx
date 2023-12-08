import React from 'react';
import { Table, Alert } from 'antd';
import { PositionElement } from '../../../api/models/Route';

type PositionTableProps = {
  positions: PositionElement[] | undefined;
  name: string;
}

const positionColumns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
  },
  {
    title: 'Orden',
    dataIndex: 'order',
  },
  {
    title: 'Latitud',
    dataIndex: 'lat',
  },
  {
    title: 'Longitud',
    dataIndex: 'lng',
  },
  {
    title: 'Distancia',
    dataIndex: 'distance',
    render: (distance: null) => distance ?? 'N/A',
  },
  {
    title: 'Tiempo Estimado',
    dataIndex: 'estimated_time',
    render: (estimated_time: null) => estimated_time ?? 'N/A',
  },
];

const getPositionData = (positions: PositionElement[] | undefined) => {
  if(!positions) {
    return [];
  }
  return positions?.map((position: PositionElement, index: number) => ({
    key: index,
    id: position.position.id,
    name: position.position.name,
    order: position.order,
    lat: position.position.lat,
    lng: position.position.lng,
    distance: position.distance,
    estimated_time: position.estimated_time,
  }))
}

const PositionTable: React.FC<PositionTableProps> = ({ positions, name }) => {
  const positionData = getPositionData(positions);

  return (
    <>
      <h2 className="mb-4 text-center font-bold">
        Paradas de la {name}
      </h2>
      {positionData?.length ? (
        <Table
          bordered
          columns={positionColumns}
          dataSource={positionData}
        />
      ) : (
        <Alert message="No hay coordenadas registradas para esta ruta" type="info" />
      )}
    </>
  );
}

export default PositionTable;
