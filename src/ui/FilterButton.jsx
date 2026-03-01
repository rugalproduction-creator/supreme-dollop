import { ListFilter } from "lucide-solid";

export default function FilterButton(){
    return(
        <div className="pl-2 md:pl-16 py-2">
            <div className="cursor-pointer hover:bg-alabaster-grey-100/20 active:bg-alabaster-grey-100/20 hover:border-alabaster-grey-400 active:border-alabaster-grey-400 hover:text-white-400 active:text-white-400 hover:scale-105 active:scale-105 text-white-300 flex flex-row gap-x-2 border border-solid border-white-100 w-fit rounded-md p-2"><ListFilter/>Genre</div>
                
        </div>
    )
}