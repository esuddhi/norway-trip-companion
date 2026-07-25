import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { TripData } from '../data/schema'
export function MapView({ data }: { data: TripData }) {
  return (
    <MapContainer center={[60.7, 7.5]} zoom={7} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {[...data.hotels, ...data.places].map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          <Popup>
            <strong>{p.name}</strong>
            <br />
            {'description' in p ? p.description : p.address}
            <br />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`}
              target="_blank"
              rel="noreferrer"
            >
              Navigate
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
