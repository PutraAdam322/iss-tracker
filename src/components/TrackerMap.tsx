import type { Parameter } from "../interface"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Prop = {
    parameters: Parameter[];
    current: any;
}

export const TrackerMap = ({ parameters, current }: Prop) => {
    if (!parameters || parameters.length === 0) {
        return <div>Loading map…</div>;
    }
    const latest = parameters[0]
    const path : [number, number][] = parameters.slice(0,500).map(p => [p.latitude, p.longitude])
    var selected:any = latest
    if(current != undefined) selected = current
    const position: [number, number] = [selected.latitude, selected.longitude];


    return (
        <div>
            <MapContainer className="border-4 border-gray-200 h-140 rounded-xl 2xl:w-3xl w-full" center={position} zoom={3}>
                <Polyline positions={path} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                />
                <Marker position={position}>
                    <Popup>
                    <div className="font-mono text-sm">
                        <p><b>Time:</b> {selected.timestamp}</p>
                        <p><b>Altitude:</b> {selected.altitude_km.toFixed(2)} km</p>
                        <p><b>Velocity:</b> {selected.velocity_kph.toFixed(2)} km/h</p>
                    </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
        
    );
}

export default TrackerMap