import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

interface SetViewWhenChangeProps {
  center: [number, number];
  zoom: number;
}

const Map: React.FC = () => {
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
    <div className="site-layout-background min-h-[360px]">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
      </Helmet>
      <MapContainer
        center={[-0.7249496, -77.3360467]}
        zoom={13}
        style={{ height: "90vh", width: "100%" }}
        attributionControl={true}
      >
        <SetViewWhenChange
          center={[-0.7249496, -77.3360467]}
          zoom={13}
        />*
        <TileLayer
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          maxZoom={19}
          attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}

export default Map;
