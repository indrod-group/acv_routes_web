import React, { useMemo } from 'react';
import { Descriptions } from 'antd';
import { formatDistance, formatEstimatedTime } from './RouteUtils';
import { PositionElement } from '../../../api/models/Route';

type RouteSummaryProps = {
	positions: PositionElement[] | undefined;
	name: string;
}

const getTotalTime = (positions: PositionElement[] | undefined): number => {
	if (!positions) {
		return 0;
	}
	const totalTime = positions.reduce(
		(acc, curr) => acc + (curr?.estimated_time ? parseInt(curr.estimated_time, 10) : 0), 0
	);
	return totalTime;
}

const getTotalDistance = (positions: PositionElement[] | undefined): number => {
	if (!positions) {
		return 0;
	}
	const totalDistance = positions.reduce((acc, curr) => acc + (curr?.distance ?? 0), 0);
	return totalDistance;
}

const RouteSummary: React.FC<RouteSummaryProps> = ({ positions, name }) => {
	const totalTime = useMemo(() => getTotalTime(positions), [positions]);
	const totalDistance = useMemo(() => getTotalDistance(positions), [positions]);
	const positionCount = positions?.length ?? 0;

	const items = [
		{
			label: "Tiempo total",
			children: formatEstimatedTime(totalTime.toString()),
		},
		{
			label: "Distancia total",
			children: formatDistance(totalDistance),
		},
		{
			label: "Número de paradas",
			children: positionCount,
		},
	];

	return (
		<Descriptions title={`Resumen de la ruta ${name}`} bordered items={items} />
	);
}

export default RouteSummary;
