import React from 'react';
import { Table, Alert } from 'antd';
import { PositionElement } from '../../../api/models';

import RouteSummary from './RouteSummary';

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
  }
];

const getPositionData = (positions: PositionElement[] | undefined) => {
  if (!positions) {
    return [];
  }
  const sortedPositions = [...positions].sort((a, b) => a.order - b.order);
  return sortedPositions.map((position: PositionElement, index: number) => ({
    key: index,
    id: position.position.id,
    name: position.position.name,
    order: position.order,
    lat: position.position.lat,
    lng: position.position.lng,
  }))
}

const PositionTable: React.FC<PositionTableProps> = ({ positions, name }) => {
  const positionData = getPositionData(positions);

  return (
    <>
      <RouteSummary positions={positions} name={name}/>
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
