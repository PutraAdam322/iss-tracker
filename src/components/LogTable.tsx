import type { Parameter } from "../interface"

type Props = {
    parameters: Parameter[];
}

const toDateString = (timestamp: number) => {
    return new Date(timestamp*1000).toLocaleString()
}

const LogTable = ({parameters}: Props) => {
    return(
        <>
            <div className='px-4 border-x-4 border-t-4 border-gray-100 rounded-t-xl w-auto'>
                <h1 className='text-gray-100 font-semibold text-base'>test</h1>
            </div>
            <div className='px-4 border-4 border-gray-100 w-auto rounded-b-xl h-128 overflow-auto '>
                <div className="flex flex-col">
                    {parameters.map((p, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-3 md:grid-cols-6 text-gray-100 font-mono text-xs border-b border-gray-200 py-1"
                        >
                            <p><b>Time:</b> {toDateString(p.timestamp)}</p>
                            <p><b>Latitude:</b> {p.latitude.toFixed(4)}°</p>
                            <p><b>Longitude:</b> {p.longitude.toFixed(4)}°</p>
                            <p><b>Altitude:</b> {p.altitude.toFixed(2)} km</p>
                            <p><b>Velocity:</b> {p.velocity.toFixed(2)} km/h</p>
                            <p><b>Visibility:</b> {p.visibility}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default LogTable;