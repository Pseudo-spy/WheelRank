import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Fuel } from 'lucide-react';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom HTML icons
const createCustomIcon = (color: string, iconHtml: string) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); color: white;">
      ${iconHtml}
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

const carIcon = createCustomIcon('#0da6f2', '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>');
const fuelIcon = createCustomIcon('#fa5f38', '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="4" y1="9" x2="14" y2="9"></line><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"></path><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"></path></svg>');

interface LiveMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export default function LiveMap({ center = [40.7128, -74.0060], zoom = 13, className = "h-full w-full" }: LiveMapProps) {
  const fuelStations = [
    { pos: [center[0] + 0.01, center[1] + 0.015] as [number, number], name: "Shell Station", price: "$3.45/gal" },
    { pos: [center[0] - 0.015, center[1] - 0.01] as [number, number], name: "Chevron", price: "$3.52/gal" },
    { pos: [center[0] + 0.005, center[1] - 0.02] as [number, number], name: "BP", price: "$3.49/gal" },
  ];

  return (
    <div className={className} style={{ zIndex: 1 }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Live GPS Marker */}
        <Marker position={center} icon={carIcon}>
          <Popup className="custom-popup">
            <div className="text-slate-900 font-bold">Your Vehicle</div>
            <div className="text-xs text-slate-500">Live GPS Location</div>
          </Popup>
        </Marker>

        {/* Fuel Stations */}
        {fuelStations.map((station, idx) => (
          <Marker key={idx} position={station.pos} icon={fuelIcon}>
            <Popup className="custom-popup">
              <div className="text-slate-900 font-bold">{station.name}</div>
              <div className="text-xs text-slate-500">{station.price}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
