export default function AccountHighlight() {
    return (
       <div className="mt-6">
            <div className="flex gap-4 overflow-x-scroll py-2">
                {Array.from({length:6}).map((_,i)=>(
                    <div className="flex flex-col items-center gap-2 mr-4 shrink-0" style={{minWidth:'72px'}} key={i}>
                        <div className="cursor-pointer p-1 rounded-full linear-to-tr from-orange-500 to-prussian-blue-700">
                            <img src={`https://picsum.photos/seed/story-${i}/120/120`} className="w-18 h-18 rounded-full object-cover"/>
                        </div>
                        <div className="text-xs text-center text-white-300">Highlight {i+1}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}