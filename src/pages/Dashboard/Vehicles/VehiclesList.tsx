import React, { useEffect, useState } from 'react';
import { List, Pagination, ColorPicker, DescriptionsProps, Descriptions, Modal, Button, Carousel, Image, Skeleton, message } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import { useApi, useVehicles } from '../../../hooks';
import { Vehicle } from '../../../Entities';
import { useVehicleContext } from './useVehicleContext';

interface VehicleCardProps {
  item: Vehicle;
}

interface VehicleTitleProps {
  item: Vehicle;
}

interface VehicleDescriptionProps {
  item: Vehicle;
}

interface VehiclePhotosProps {
  item: Vehicle;
}
interface BrokerInfoPhotosProps {
  vehicle: Vehicle | null;
}

const VehicleTitle: React.FC<VehicleTitleProps> = ({ item }) => {
  return (
    <div className='flex flex-row items-center justify-between'>
      <p>{`${item.plate ? item.plate : ''}`}</p>
      <p>{`${item.vehicle_type.brand} ${item.vehicle_type.model} (${item.vehicle_type.year})`}</p>
      <ColorPicker defaultValue={`${item.color}`} disabled />
    </div>
  )
}

const VehicleDescription: React.FC<VehicleDescriptionProps> = ({ item }) => {
  const descriptionItems: DescriptionsProps['items'] = [];

  if (item.chassis) {
    descriptionItems.push({
      key: '1',
      label: 'Chasis',
      children: <p>{item.chassis}</p>,
    });
  }

  if (item.tonnage) {
    descriptionItems.push({
      key: '2',
      label: 'Tonelaje',
      children: <p>{item.tonnage}</p>,
    });
  }

  if (item.vin) {
    descriptionItems.push({
      key: '3',
      label: 'VIN',
      children: <p>{item.vin}</p>,
    });
  }

  if (item.device?.imei) {
    descriptionItems.push({
      key: '4',
      label: 'Dispositivo',
      children: <p>{item.device.imei}</p>,
    });
  }

  if (item.vehicle_type.version) {
    descriptionItems.push({
      key: '5',
      label: 'Modelo',
      children: <p>{item.vehicle_type.version}</p>,
    });
  }

  if (item.vehicle_type.fuel_type) {
    descriptionItems.push({
      key: '6',
      label: 'Combustible',
      children: <p>{item.vehicle_type.fuel_type}</p>,
    });
  }

  if (item.vehicle_type.city_mileage && item.vehicle_type.highway_mileage && item.vehicle_type.mixed_mileage) {
    descriptionItems.push({
      key: '7',
      label: 'Consumo',
      children: <p>{item.vehicle_type.city_mileage}, {item.vehicle_type.highway_mileage}, {item.vehicle_type.mixed_mileage} litros cada 100km</p>,
    });
  }

  return (
    <Descriptions
      bordered
      items={descriptionItems}
      size={'small'}
    />
  )
}

const VehiclePhotos: React.FC<VehiclePhotosProps> = ({ item }) => {
  const photos: string[] = [];

  if (item.front_photo) {
    photos.push(item.front_photo);
  }

  if (item.rear_photo) {
    photos.push(item.rear_photo);
  }

  if (item.left_side_photo) {
    photos.push(item.left_side_photo);
  }

  if (item.right_side_photo) {
    photos.push(item.right_side_photo);
  }

  return (
    <>
      {photos.length > 0 ? (
        <Carousel
          autoplay
          swipeToSlide
          lazyLoad='progressive'
        >
          {photos.map((photo, index) => (
            <Image.PreviewGroup key={`${index}-${photo}`} items={photos}>
              <Image
                src={photo}
                width={480}
                alt={`${index}-${photo}`}
              />
            </Image.PreviewGroup>
          ))}
        </Carousel>
      ) : <Skeleton.Image className='mb-2' active />}
    </>
  );
};
interface BrokerInfoData {
  insurance_company: string;
  issue_date: string;
  expiry_date: string;
}
const BrokerInfo: React.FC<BrokerInfoPhotosProps> = ({ vehicle }) => {
  const [brokerInfo, setBrokerInfo] = useState<BrokerInfoData | null>(null);
  const api = useApi();

  useEffect(() => {
    if (vehicle?.vuid) {
      api.get(`/vehicles/${vehicle.vuid}/brokerinfo`)
        .then(response => {
          const data = response.data[0];
          if (data) {
            setBrokerInfo({
              insurance_company: data.insurance_company,
              issue_date: data.issue_date,
              expiry_date: data.expiry_date,
            });
          }
        })
        .catch(error => {
          console.error('Error fetching broker information: ', error);
          message.error('Ha habido un problema obteniendo la información del broker.');
        });
    }
  }, [vehicle, api]);

  return (
    <Descriptions bordered size="small" column={1}>
      <Descriptions.Item label="Nombre de la Compañía de Seguros">
        {brokerInfo?.insurance_company || "No se encontró información de broker"}
      </Descriptions.Item>
      <Descriptions.Item label="Fecha de Emisión">
        {brokerInfo?.issue_date || "No disponible"}
      </Descriptions.Item>
      <Descriptions.Item label="Fecha de Expiración">
        {brokerInfo?.expiry_date || "No disponible"}
      </Descriptions.Item>
    </Descriptions>
  );
};

const VehicleCard: React.FC<VehicleCardProps> = ({ item }) => {
  const [visible, setVisible] = useState(false);
  const { selectedVehicle, setSelectedVehicle } = useVehicleContext();
  const [showBroker, setShowBroker] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setShowBroker(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setShowBroker(false);
  };

  const handleItemClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <List.Item
      className={`cursor-pointer ${selectedVehicle?.vuid === item.vuid ? 'bg-blue-200' : ''}`}
      onClick={() => handleItemClick(item)}
    >
      <List.Item.Meta
        avatar={<CarOutlined />}
        className='w-full'
        title={<VehicleTitle item={item} />}
        description={<VehicleDescription item={item} />}
      />
      <Button type="link" onClick={showModal}>
        Mostrar
      </Button>
      <Modal
        className='w-full'
        title="Detalles del vehículo"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <VehiclePhotos item={item} />
        <VehicleDescription item={item} />
      </Modal>
      <Button type="link" onClick={() => { setShowBroker(true) }}>
        Información de broker
      </Button>
      <Modal
        className='w-full'
        title="Información de broker"
        open={showBroker}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <BrokerInfo vehicle={selectedVehicle} />
      </Modal>
    </List.Item>
  );
};

interface VehiclePaginationSpanProps {
  total: number;
  range: [number, number];
}

const VehiclePaginationSpan: React.FC<VehiclePaginationSpanProps> = ({ total, range }) => {
  return (
    <span className="px-2 py-1">
      Mostrando {range[0]} - {range[1]} de {total} vehículos
    </span>
  );
}

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
  const currentVehicles = vehicles.slice(startIndex, endIndex).map((vehicle) => ({
    ...vehicle, key: vehicle.vuid
  }));

  return (
    <List
      bordered
      header={
        <>
          <h2 className='flex justify-center items-center'>Lista de vehículos</h2>
          <Pagination
            className="mt-4 mb-4 mx-auto"
            total={vehicles.length}
            current={currentPage}
            onChange={handlePageChange}
            defaultPageSize={itemsPerPage}
            showSizeChanger
            showTotal={(total, range) => <VehiclePaginationSpan total={total} range={range} />}
          />
        </>
      }
      itemLayout="horizontal"
      dataSource={currentVehicles}
      pagination={false}
      renderItem={item => (
        <VehicleCard item={item as Vehicle} />
      )}
    />
  );
};

export default VehicleList;
