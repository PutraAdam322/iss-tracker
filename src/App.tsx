import { useEffect, useState } from "react";
import * as Papa from "papaparse";
import Header from "./components/Header";
import LogTable from "./components/LogTable";
import TrackerMap from "./components/TrackerMap";
import type { Parameter } from "./interface";

function App() {
  const [data, setData] = useState<Parameter[]>([]);
  const [current, setCurrent] = useState<any>()

  useEffect(() => {
    fetch("/iss_data.csv")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch CSV");
        return res.text();
      })
      .then((csvText) => {
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });
        const cleaned = (parsed.data as any[]).map((row) => ({
          timestamp: (row.timestamp),
          latitude: Number(row.latitude),
          longitude: Number(row.longitude),
          altitude_km: Number(row.altitude_km),
          velocity_kph: Number(row.velocity_kph),
        }));
        setData(cleaned.reverse() as Parameter[]);
      })
      .catch((err) => {
        console.error("CSV load error:", err);
      });
  }, []);

  return (
  <div className="relative min-h-screen bg-[url('/src/assets/1144063.png')] bg-fixed bg-cover bg-no-repeat">
    <div className="absolute inset-0 bg-black/75"></div>
      <div className="relative z-10">
        <Header />
        <section className="py-10">
          <div className=" px-8 sm:px-24 container mx-auto">
            <div className="flex flex-col gap-8 mb-8">
              <h1 className="text-5xl text-zinc-100 font-mono">Track the station</h1>
              <p className="text-3xl text-zinc-100 font-mono">Find the exact location of the International Space Station now!</p>
            </div>
            <div className="flex flex-col 2xl:flex-row 2xl:gap-4 gap-16 w-full ">
              <div>{<TrackerMap parameters={data} current={current}/>}</div>
              <div><LogTable parameters={data} current={current} setCurrent={setCurrent}/></div>
            </div> 
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
