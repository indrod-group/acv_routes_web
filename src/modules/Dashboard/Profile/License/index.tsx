import React, { useState } from 'react';
import { Card, Carousel, Image, Divider, List, Pagination } from 'antd';
import { useLicenses } from '../../../../api/hooks';

interface LicensePaginationSpanProps {
  total: number;
  range: [number, number];
}

const LicensePaginationSpan: React.FC<LicensePaginationSpanProps> = ({ total, range }) => {
  return (
    <span className="px-2 py-1">
      Mostrando {range[0]} - {range[1]} de {total} licencias
    </span>
  );
}

const LicenseCard: React.FC = () => {
  const { licenses } = useLicenses();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

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

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setItemsPerPage(pageSize);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentLicense = licenses.slice(startIndex, endIndex).map((license) => ({
    ...license, key: license.id
  }));
  const getPhotos = (index: number) => {
    return [licenses[index].front_image, licenses[index].back_image];
  }
  return (
    <List
      className="w-full"
      header={
        <>
          {licenses.length === 0 || licenses.length === 1 ? <></> : <h2 className='flex justify-center items-center'>Lista de licencias</h2>
          }
          <Pagination
            className="mt-4 mb-4 mx-auto"
            total={licenses.length}
            current={currentPage}
            onChange={handlePageChange}
            defaultPageSize={itemsPerPage}
            hideOnSinglePage
            showTotal={(total, range) => <LicensePaginationSpan total={total} range={range} />}
          />
        </>
      }
      itemLayout="horizontal"
      dataSource={currentLicense}
      renderItem={(item, index) => (
        <List.Item>
          <Card
            className='w-full h-90 flex-grow xl:max-w-xl xs:max-w-xs mt-4 md:mt-0 max-h-100 items-center justify-center'
            title={`Licencia tipo ${item.type} - ${item.points} puntos`}
          >
            <Carousel
              style={{ height: 250 }}
              autoplay={false}
              draggable={true}
              dots={true}
              swipeToSlide
              lazyLoad='progressive'
            >
                <Image.PreviewGroup key={`${index}-${item.back_image}`} items={getPhotos(index)}>
                  <Image
                    src={item.front_image}
                    height={250}
                    alt={item.front_image}
                  />
                </Image.PreviewGroup>
                <Image.PreviewGroup key={`${index}-${item.back_image}`} items={getPhotos(index)}>
                  <Image
                    src={item.back_image}
                    height={250}
                    alt={item.back_image}
                  />
                </Image.PreviewGroup>
              </Carousel>
            <Divider />
            <p>Válida desde {item.issue_date} hasta {item.expiry_date}.</p>
          </Card>
        </List.Item>
      )}
    />

  );
};

export default LicenseCard;
