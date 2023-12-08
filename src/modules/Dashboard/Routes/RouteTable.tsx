import React, { useState } from 'react';
import { Table } from 'antd';
import { Route } from '../../../api/models/Route';
import PositionTable from './PositionTable';

type RouteTableProps = {
  routePositions: Route[] | undefined;
}

const getDataRoute = (routePositions: Route[] | undefined) => {
  if (!routePositions) {
    return [];
  }
  return routePositions?.map((route, index) => ({
    key: index,
    ...route,
  }))
}

function titleCase(str: string) {
  return str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

const renderPositionTable = (selectedRoute: Route | null) => {
  if (selectedRoute) {
    return (
      <div className="w-full md:w-3/4 p-2">
        <PositionTable
          positions={selectedRoute.positions}
          name={titleCase(selectedRoute.name)}
        />
      </div>
    );
  }
  return null;
}

const getRowClassName = (route1: Route, route2: Route | null) => {
  if (route1?.id === route2?.id) {
    return "cursor-pointer bg-blue-200"
  }
  return "cursor-pointer"
}

const RouteTable: React.FC<RouteTableProps> = ({ routePositions }) => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const routeColumns = [{
    title: 'Nombre',
    dataIndex: 'name',
    render: titleCase
  }];

  const routeData = getDataRoute(routePositions);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-2">
        <h2 className="mb-4 text-center font-bold">
          Rutas
        </h2>
        <Table
          bordered
          columns={routeColumns}
          dataSource={routeData}
          loading={!routePositions}
          onRow={(record: Route) => ({
            onClick: () => { setSelectedRoute(record) }
          })}
          rowClassName={(record: Route) => getRowClassName(record, selectedRoute)}
        />
      </div>
      {renderPositionTable(selectedRoute)}
    </div>
  );
}

export default RouteTable;
