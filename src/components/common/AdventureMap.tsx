import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Destination } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface AdventureMapProps {
  destinations: Destination[];
  onSelectDestination?: (dest: Destination) => void;
  selectedDestinationId?: string;
  className?: string;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  destinations,
  onSelectDestination,
  selectedDestinationId,
  className = 'h-[500px] w-full rounded-3xl',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const { formatAmount } = useCurrency();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map is already initialized
    if (!mapInstanceRef.current) {
      // Center roughly around South/Southeast Asia (lat 22, lng 79)
      const map = L.map(mapContainerRef.current, {
        center: [22.5, 78.5],
        zoom: 4,
        zoomControl: true,
        attributionControl: false,
      });

      // Bright, colorful CartoDB Voyager basemap tiles
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          subdomains: 'abcd',
        }
      ).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Custom vibrant adventure orange marker pin
    const customIcon = L.divIcon({
      className: 'custom-adventure-pin',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #FF5722 0%, #FF6B35 100%);
          border: 2px solid #FFFFFF;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 6px 14px rgba(255, 87, 34, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 10px;
            height: 10px;
            background: #FFFFFF;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -34],
    });

    destinations.forEach((dest) => {
      const { lat, lng } = dest.coordinates;
      if (!lat || !lng) return;

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 text-slate-800';
      popupContent.innerHTML = `
        <div style="width: 230px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <img src="${dest.imageUrl}" alt="${dest.name}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 12px; margin-bottom: 8px;" />
          <h4 style="font-size: 15px; font-weight: 800; margin: 0 0 2px 0; color: #0F172A;">${dest.name}</h4>
          <p style="font-size: 11px; color: #64748B; margin: 0 0 6px 0; font-weight: 600;">${dest.stateCountry}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; padding-top: 6px; border-top: 1px solid #E2E8F0;">
            <span style="font-size: 11px; font-weight: 700; color: #FF5722;">From ${formatAmount(dest.minBudgetInr)}</span>
            <a href="/destinations/${dest.slug}" style="font-size: 11px; font-weight: 800; color: #0284C7; text-decoration: none;">View Details →</a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        if (onSelectDestination) {
          onSelectDestination(dest);
        }
      });

      markersRef.current.push(marker);
    });

    return () => {
      // Keep instance intact
    };
  }, [destinations, formatAmount, onSelectDestination]);

  return (
    <div className={`relative overflow-hidden border border-slate-200 shadow-xl ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full z-0" />
      <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-800 pointer-events-none flex items-center gap-2 shadow-md">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] animate-ping" />
        <span>Live Adventure Coordinates</span>
      </div>
    </div>
  );
};
