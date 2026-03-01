import { BellIcon, DownloadIcon } from "lucide-solid";
import Sidebar from "./Sidebar";

export default function Layout(props){
    return(
        <div className="w-screen h-screen overflow-hidden">
            <BellIcon className="fixed top-4 right-4 z-100 text-white-300 cursor-pointer hover:text-prussian-blue-600 active:text-prussian-blue-600 hover:scale-125 active:scale-125 transition-all duration-300"/>
            <DownloadIcon className="fixed top-4 right-16 z-100 text-white-300 cursor-pointer hover:text-prussian-blue-600 active:text-prussian-blue-600 hover:scale-125 active:scale-125 transition-all duration-300"/>
            <Sidebar/>
            <div>
                {props.children}
            </div>
        </div>
    )
}