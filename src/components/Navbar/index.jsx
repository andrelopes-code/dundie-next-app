
export default function Navbar() {
    
    return (
    <header className="bg-background-light">
    <nav className="mx-24 flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
        <a href="/dashboard" className="-m-1.5 p-1.5">
            <span className="font-bold text-2xl text-primary-dark">Dundie</span>
        </a>
        </div>
        <div className="flex lg:hidden">
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-light">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <div className="flex flex-row items-center gap-11">
            <div className="hidden lg:flex lg:gap-x-7">
                <a href="/profile" className="text-sm font-bold leading-6 text-text">PROFILE</a>
                <a href="/donate" className="text-sm font-bold leading-6 text-text">DONATE</a>
                <a href="/admin" className="text-sm font-bold leading-6 text-text">ADMIN</a>
            </div>
                <a href="/logout" className="bg-primary-dark py-1 px-2 rounded-lg text-sm font-semibold leading-6 text-text-invert">Log out</a>
            </div>
        </div>
    </nav>
    <div className="lg:hidden">
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
            <a href="/dashboard" className="-m-1.5 p-1.5">
            <span className="font-bold text-2xl text-primary-dark">Dundie</span>
            </a>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-text-light">
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
        <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
                <a href="/profile" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text hover:bg-gray-50">Profile</a>
                <a href="/donate" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text hover:bg-gray-50">Donate</a>
                <a href="/admin" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text hover:bg-gray-50">Administrative</a>
            </div>
            <div className="py-6">
                <a href="/logout" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-text hover:bg-gray-50">Log out</a>
            </div>
            </div>
        </div>
        </div>
    </div>
    </header>
    )
}