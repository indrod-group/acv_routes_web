import React from 'react';
import { Card } from 'antd';
import { useVehicleManual } from '../../../../api/hooks';

const VehicleManualComponent: React.FC = () => {
  const { manual, getManual } = useVehicleManual();

  React.useEffect(() => {
    getManual();
  }, [getManual]);

  return (
    <div>
      {manual ? (
        <Card title="Manual de Mantenimiento">
          <p><strong>ID del Manual:</strong> {manual.muid}</p>
          <p><strong>Fecha de Inicio:</strong> {new Date(manual.start_date).toLocaleDateString()}</p>
          <p><strong>Alertas de Avance:</strong> {manual.advance_alerts}</p>
          <p><strong>Frecuencia Mínima:</strong> {manual.minimum_frequency}</p>
          <p><strong>Fin del Ciclo:</strong> {manual.end_of_cycle}</p>
          <p><strong>Tipo de Vehículo:</strong> {manual.vehicle_type}</p>
          {manual.manual_tasks.map((task, index) => (
            <Card key={index} title={`Tarea ${index + 1}`}>
              <p><strong>ID de la Tarea:</strong> {task.id}</p>
              <p><strong>Sistema:</strong> {task.system}</p>
              <p><strong>Subsistema:</strong> {task.subsystem}</p>
              <p><strong>Tarea:</strong> {task.task}</p>
              <p><strong>Descripción:</strong> {task.description}</p>
              <p><strong>Frecuencia:</strong> {task.frequency}</p>
              <p><strong>Ayuda:</strong> {task.help_me}</p>
            </Card>
          ))}
        </Card>
      ) : (
        <p>Cargando manual...</p>
      )}
    </div>
  );
};

export default VehicleManualComponent;
