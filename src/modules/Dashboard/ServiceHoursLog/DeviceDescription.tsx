import { Card, Descriptions, Alert } from "antd";
import { censoreIMEI, formatName } from "./ChartUtils";
import type { Device } from "../../../api/models";

interface DeviceDescriptionProps {
  selectedDevice: Device | null;
}

export default function DeviceDescription({ selectedDevice }: DeviceDescriptionProps) {
  if (!selectedDevice) {
    return <Alert message="No se ha seleccionado ningún usuario." type="info" showIcon />
    ;
  }

  const isSameUserAndOwner = selectedDevice.user_name === selectedDevice.car_owner;
  const isSameLicenseAndVin = selectedDevice.license_number === selectedDevice.vin;

  return (
    <Card className="print:block" title="Información del vehículo">
      <Descriptions>
        {isSameUserAndOwner ? (
          <Descriptions.Item label="Usuario y propietario">{formatName(selectedDevice.user_name)}</Descriptions.Item>
        ) : (
          <>
            <Descriptions.Item label="Usuario">{formatName(selectedDevice.user_name)}</Descriptions.Item>
            <Descriptions.Item label="Propietario">{formatName(selectedDevice.car_owner as string) || 'N/A'}</Descriptions.Item>
          </>
        )}
        {isSameLicenseAndVin ? (
          <Descriptions.Item label="Placa">{selectedDevice.license_number || 'N/A'}</Descriptions.Item>
        ) : (
          <>
            <Descriptions.Item label="Placa">{selectedDevice.license_number || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="VIN">{selectedDevice.vin || 'N/A'}</Descriptions.Item>
          </>
        )}
        <Descriptions.Item label="IMEI del dispositivo">{censoreIMEI(selectedDevice.imei)}</Descriptions.Item>
        <Descriptions.Item label="Seguimiento">{selectedDevice.is_tracking_alarms ? 'Activado' : 'Desactivado'}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
