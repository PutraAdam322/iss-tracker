import Header from './components/Header'
import LogTable from './components/LogTable'
import MockData from './assets/iss_mock_data.json'
import TrackerMap from './components/TrackerMap'

function App() {

  return (
    <div className="relative min-h-screen bg-[url('/src/assets/1144063.png')] bg-fixed bg-cover bg-no-repeat">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <section className="py-10">
          <div className="flex flex-col container mx-auto px-8 sm:px-24">
            <TrackerMap parameter={MockData[0]} />
            <div className='my-24'/>
            <LogTable parameters={MockData} />
          </div>
        </section>
      </div>
    </div>
  );

}

export default App
