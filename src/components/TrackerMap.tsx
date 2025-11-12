import type { Parameter } from "../interface"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TrackerMap = ({parameter}:{parameter:Parameter}) => {
    const position: [number, number] = [parameter.latitude, parameter.longitude];

    return (
        <div>
            <MapContainer className="border-4 border-gray-200 rounded-xl" center={position} zoom={3} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
            />
            <Marker position={position}>
                <Popup>
                <div className="font-mono text-sm">
                    <p><b>Time:</b> {new Date(parameter.timestamp * 1000).toLocaleString()}</p>
                    <p><b>Altitude:</b> {parameter.altitude.toFixed(2)} km</p>
                    <p><b>Velocity:</b> {parameter.velocity.toFixed(2)} km/h</p>
                    <p><b>Visibility:</b> {parameter.visibility}</p>
                </div>
                </Popup>
            </Marker>
            </MapContainer>
        </div>
        
    );
}

export default TrackerMap