import React from 'react';
import { Descriptions } from 'antd';
import { PositionElement } from '../../../Entities';

type RouteSummaryProps = {
	positions: PositionElement[] | undefined;
	name: string;
}


const RouteSummary: React.FC<RouteSummaryProps> = ({ positions, name }) => {
	const positionCount = positions?.length ?? 0;

	const items = [
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
