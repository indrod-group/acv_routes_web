import { useEffect } from 'react';
import { Carousel } from 'antd';

import { Advertisement } from '../../../api/models';
import { useAdvertisements } from '../../../api/hooks';

type AdvertisementsProps = Readonly<{
  collapsed: boolean;
}>;
/**
 * AdvertisementsCarousel component
 * 
 * This component is used to display a carousel of advertisements.
 */
function AdvertisementsCarousel({ collapsed }: AdvertisementsProps) {
  const { advertisements, fetchAdvertisements } = useAdvertisements();

  useEffect(() => {
    fetchAdvertisements();
  }, [fetchAdvertisements]);

  return (
    <Carousel
      autoplay
      className={`${collapsed ? 'w-0 h-0 bg-opacity-0 hidden' : 'w-48 h-48 bg-opacity-20 block'} m-12 p-4 bg-white rounded-md flex items-center justify-center`}
      fade
      infinite
      dots={false}
    >
      {advertisements.map((advertisement: Advertisement) => (
        <div
          className='flex justify-center items-center h-full w-full'
          key={advertisement.id}
        >
          <a href={advertisement.url} target="_blank" rel="noopener noreferrer">
            <img
              className='w-full h-full bg-cover'
              width={200}
              src={advertisement.photo}
              alt={advertisement.alternate_name}
            />
          </a>
        </div>
      ))}
    </Carousel>
  );
}

export default AdvertisementsCarousel;
