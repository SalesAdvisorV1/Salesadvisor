"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import type { ProspectResult } from "@/types/prospect";
import type { ProspectSearchFormValues } from "@/lib/schemas/prospect-search";

// Libraries to load with the Maps JS API. Empty = core only (cheapest).
const MAP_LIBRARIES: ("places" | "drawing" | "geometry" | "marker" | "visualization")[] = [];
const FRANCE_CENTER = { lat: 46.6034, lng: 1.8883 }; // geographic center of France
const DEFAULT_ZOOM = 6;

// Map container style
const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: "12px",
};

// Sober indigo-tinted map style (subtle, professional)
const SA_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f8fafc" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#cbd5e1" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#475569" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e2e8f0" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#dbeafe" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#6366f1" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f1f5f9" }] },
];

interface ProspectionMapProps {
  filters: ProspectSearchFormValues | null;
  prospects: ProspectResult[];
}

interface LocatedProspect {
  prospect: ProspectResult;
  lat: number;
  lng: number;
}

// Cache geocoded cities across renders (module-level, persists across mount/unmount)
const cityCoordsCache = new Map<string, { lat: number; lng: number } | null>();

async function geocodeFrenchCity(city: string): Promise<{ lat: number; lng: number } | null> {
  const key = city.trim().toLowerCase();
  if (cityCoordsCache.has(key)) return cityCoordsCache.get(key) ?? null;

  try {
    const res = await fetch(
      `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(city)}&fields=centre&boost=population&limit=1`
    );
    const data: { centre?: { coordinates: [number, number] } }[] = await res.json();
    if (data[0]?.centre?.coordinates) {
      const [lng, lat] = data[0].centre.coordinates;
      const coords = { lat, lng };
      cityCoordsCache.set(key, coords);
      return coords;
    }
  } catch {
    /* ignore */
  }
  cityCoordsCache.set(key, null);
  return null;
}

export function ProspectionMap({ filters, prospects }: ProspectionMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: MAP_LIBRARIES,
  });

  const [located, setLocated] = useState<LocatedProspect[]>([]);
  const [centerCoords, setCenterCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<LocatedProspect | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Geocode the search city (for centering)
  useEffect(() => {
    let cancelled = false;
    if (!filters?.city) {
      setCenterCoords(null);
      return;
    }
    geocodeFrenchCity(filters.city).then((coords) => {
      if (!cancelled) setCenterCoords(coords);
    });
    return () => {
      cancelled = true;
    };
  }, [filters?.city]);

  // Geocode all prospects' cities
  useEffect(() => {
    let cancelled = false;
    if (prospects.length === 0) {
      setLocated([]);
      return;
    }
    (async () => {
      const results: LocatedProspect[] = [];
      // Parallel geocoding, but cache prevents duplicate requests
      const promises = prospects.map(async (p) => {
        if (!p.city) return null;
        const coords = await geocodeFrenchCity(p.city);
        if (!coords) return null;
        return { prospect: p, ...coords } as LocatedProspect;
      });
      const settled = await Promise.all(promises);
      for (const r of settled) if (r) results.push(r);
      if (!cancelled) setLocated(results);
    })();
    return () => {
      cancelled = true;
    };
  }, [prospects]);

  // Auto-fit bounds to show all pins + center city
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    if (located.length === 0 && !centerCoords) return;

    const bounds = new google.maps.LatLngBounds();
    if (centerCoords) bounds.extend(centerCoords);
    for (const l of located) bounds.extend({ lat: l.lat, lng: l.lng });

    // If only one point, just center; don't fit bounds (would zoom too far)
    if (located.length === 0 && centerCoords) {
      mapRef.current.setCenter(centerCoords);
      mapRef.current.setZoom(11);
      return;
    }
    mapRef.current.fitBounds(bounds, 60);
  }, [located, centerCoords, isLoaded]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const mapOptions: google.maps.MapOptions = useMemo(
    () => ({
      styles: SA_MAP_STYLE,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: "greedy",
      backgroundColor: "#f1f5f9",
    }),
    []
  );

  // ---- Render branches ----

  if (!apiKey) {
    return (
      <PlaceholderState
        title="Carte non configurée"
        message="Ajoutez NEXT_PUBLIC_GOOGLE_MAPS_API_KEY dans .env.local pour activer la carte."
        tone="warning"
      />
    );
  }

  if (loadError) {
    return (
      <PlaceholderState
        title="Erreur de chargement"
        message="Impossible de charger Google Maps. Vérifiez votre clé API et les restrictions de domaine."
        tone="error"
      />
    );
  }

  if (!isLoaded) {
    return (
      <PlaceholderState
        title="Chargement de la carte…"
        message="Initialisation Google Maps en cours."
        tone="loading"
      />
    );
  }

  // SVG marker icon — indigo pin matching site charter
  const markerIcon: google.maps.Symbol = {
    path: "M12 0C5.4 0 0 5.4 0 12c0 9 12 22 12 22s12-13 12-22c0-6.6-5.4-12-12-12z",
    fillColor: "#6366f1",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 2,
    scale: 1.1,
    anchor: new google.maps.Point(12, 34),
    labelOrigin: new google.maps.Point(12, 12),
  };

  // Center marker (the searched city) — slightly different (violet)
  const centerMarkerIcon: google.maps.Symbol = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "#8b5cf6",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 3,
    scale: 9,
  };

  return (
    <div className="relative h-72 overflow-hidden rounded-xl" style={{ border: '1px solid rgba(99,102,241,0.10)' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerCoords ?? FRANCE_CENTER}
        zoom={centerCoords ? 11 : DEFAULT_ZOOM}
        options={mapOptions}
        onLoad={onLoad}
      >
        {/* Center pin — searched city */}
        {centerCoords && (
          <Marker
            position={centerCoords}
            icon={centerMarkerIcon}
            zIndex={999}
            title={filters?.city}
          />
        )}

        {/* Prospect pins */}
        {located.map((l) => (
          <Marker
            key={l.prospect.id}
            position={{ lat: l.lat, lng: l.lng }}
            icon={markerIcon}
            onClick={() => setSelected(l)}
            title={l.prospect.name}
          />
        ))}

        {/* Info window on click */}
        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div style={{ minWidth: 180, padding: '2px 4px' }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                {selected.prospect.name}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: '#64748b' }}>
                {selected.prospect.sector} · {selected.prospect.city}
              </p>
              <p style={{ margin: '6px 0 0', fontSize: 11, color: '#4f46e5', fontWeight: 600 }}>
                Score · {selected.prospect.score}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Overlay legend if there are pins */}
      {located.length > 0 && (
        <div
          className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-[11px] font-semibold tabular-nums"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(99,102,241,0.18)',
            color: '#4f46e5',
            boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
          }}
        >
          {located.length} prospect{located.length > 1 ? 's' : ''} sur la carte
        </div>
      )}
    </div>
  );
}

// ----- Helpers -----

function PlaceholderState({
  title,
  message,
  tone,
}: {
  title: string;
  message: string;
  tone: 'loading' | 'warning' | 'error';
}) {
  const palette = tone === 'error'
    ? { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.20)', color: '#dc2626' }
    : tone === 'warning'
    ? { bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.20)', color: '#b45309' }
    : { bg: 'rgba(99,102,241,0.04)', border: 'rgba(99,102,241,0.14)', color: '#4f46e5' };

  return (
    <div
      className="relative h-72 overflow-hidden rounded-xl flex flex-col items-center justify-center text-center px-6"
      style={{
        background: palette.bg,
        border: `1px solid ${palette.border}`,
      }}
    >
      {tone === 'loading' && (
        <svg className="animate-spin mb-3" width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(99,102,241,0.2)" strokeWidth="3" />
          <path d="M22 12a10 10 0 0 0-10-10" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      <p className="text-sm font-semibold mb-1" style={{ color: palette.color }}>{title}</p>
      <p className="text-xs max-w-xs leading-relaxed" style={{ color: '#64748b' }}>{message}</p>
    </div>
  );
}
