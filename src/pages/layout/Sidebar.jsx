import { A } from "@solidjs/router";
import { HouseIcon, Album, Settings, UsersRoundIcon, SearchIcon } from "lucide-solid";

export default function Sidebar(){
    return(
        <div className="transition-all cursor-pointer duration-700 fixed bottom-0 md:top-0 w-screen hover:max-w-full active:max-w-full md:max-w-15 overflow-x-hidden h-fit md:w-fit md:h-screen text-white-300 bg-black-500 shadow-lg shadow-prussian-blue-700 z-120">
            <div className="relative h-full py-4 px-6">
                <div className="flex flex-row justify-evenly gap-x-12 md:grid md:grid-col-1 md:gap-y-4">
                    <A href="/" className="md:flex md:flex-row md:gap-x-3 hover:text-orange-500 active:text-orange-500 cursor-pointer hover:scale-115 active:scale-115 transition-all duration-300">
                        <HouseIcon/>
                        <div className="md:w-fit hidden md:block">Home</div>
                    </A>
                    <A href="/search" className="md:flex md:flex-row md:gap-x-3 hover:text-orange-500 active:text-orange-500 cursor-pointer hover:scale-115 active:scale-115 transition-all duration-300">
                        <SearchIcon/>
                        <div className="md:w-fit hidden md:block">Search</div>
                    </A>
                    <A href="/album" className="md:flex md:flex-row md:gap-x-3 hover:text-orange-500 active:text-orange-500 cursor-pointer hover:scale-115 active:scale-115 transition-all duration-300">
                        <Album/>
                        <div className="md:w-fit hidden md:block">Album</div>
                    </A>
                    <A href="/account" className="md:flex md:flex-row md:gap-x-3 hover:text-orange-500 active:text-orange-500 cursor-pointer hover:scale-115 active:scale-115 transition-all duration-300">
                        <UsersRoundIcon/>
                        <div className="md:w-fit hidden md:block">Account</div>
                    </A>
                    <A href="/settings" className="md:flex md:flex-row md:gap-x-3 md:absolute bottom-4 md:bottom-6 cursor-pointer hover:text-prussian-blue-700 active:text-prussian-blue-700 hover:scale-115 active:scale-115 transition-all duration-600">
                        <Settings/>
                        <div className="md:w-fit hidden md:block">Settings</div>
                    </A>
                </div>
            </div>
        </div>
    )
}