import SpaceStation from '../assets/space-station.png'

const Header = () => {
    return(
        <div className="border-b bg-zinc-900">
            <header className="container mx-auto px-8 sm:px-24 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-row gap-4">
                        <img src={SpaceStation} className='size-9' alt="" />
                        <h1 className="text-2xl text-zinc-100 font-bold font-mono">ISS Tracker</h1>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;