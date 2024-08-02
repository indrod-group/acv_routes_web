import React from 'react';
import { Card, Carousel, Image, Divider } from 'antd'; // Importa el componente Carousel
import { License } from '../../../../api/models';
import { useLicenses } from '../../../../api/hooks';

const LicenseCard: React.FC = () => {
  const { licenses } = useLicenses();

  if (licenses.length === 0) {
    return (
      <Card
        className="max-h-60"
        title="Licencia"
        style={{ width: 300 }}
      >
        <p>No hay licencias disponibles.</p>
      </Card>
    );
  }

  const license: License = licenses[0];
  const photos: string[] = [license.front_image, license.back_image];

  return (
    <Card
      className='w-full h-80 flex-grow xl:max-w-xl xs:max-w-xs mt-4 md:mt-0 max-h-100 items-center justify-center'
      title={`Licencia tipo ${license.type} - ${license.points} puntos`}
    >
      <Carousel
        style={{ height: 250 }}
        autoplay={false}
        draggable={true}
        dots={true}
        swipeToSlide
        lazyLoad='progressive'
      >
        {photos.map((photo, index) => (
          <Image.PreviewGroup key={`${index}-${photo}`} items={photos}>
            <Image
              src={photo}
              height={250}
              alt={`${index}-${photo}`}
            />
          </Image.PreviewGroup>
        ))}
      </Carousel>
      <Divider />
      <p>Válida desde {license.issue_date} hasta {license.expiry_date}.</p>
    </Card>
  );
};

export default LicenseCard;
