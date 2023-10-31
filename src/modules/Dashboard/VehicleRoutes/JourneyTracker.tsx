import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'antd';

interface SetViewWhenChangeProps {
  center: [number, number];
  zoom: number;
}

const JourneyTracker: React.FC = () => {
  const SetViewWhenChange: React.FC<SetViewWhenChangeProps> = ({ center, zoom }) => {
    const map = useMap();
    useMapEvents({
      resize: () => {
        map.invalidateSize();
      },
    });
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
      </Helmet>
      <Card
        className="map-container flex-col h-[550px] w-full items-center"
        title={<h3>Mapa:</h3>}
      >
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          attributionControl={true}

        >
          <SetViewWhenChange
            center={[51.505, -0.09]}
            zoom={13}
          />
          <TileLayer
            url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${import.meta.env.VITE_REACT_APP_GEOAPIFY_API_KEY as string}`}
            maxZoom={19}
            attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </Card>
    </>
  );
}

export default JourneyTracker;
