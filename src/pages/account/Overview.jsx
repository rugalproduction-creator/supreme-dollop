import { PenIcon, EllipsisIcon, RocketIcon } from "lucide-solid";

export default function AccountOverview({user}){
    return (
        <div className="p-2">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                <div className="flex items-center gap-6 mx-auto md:mx-0">
                    <div className="p-1 rounded-full bg-linear-to-tr from-orange-500 to-prussian-blue-700">
                        <img src={user.avatar} alt="avatar" className="w-32 h-32 rounded-full object-cover border-2 border-white-400 block"/>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 md:gap-4 mb-4 flex-wrap">
                        <h2 className="text-2xl font-semibold text-prussian-blue-700">{user.username}</h2>
                        <button
                            title="Edit profile"
                            aria-label="Edit profile"
                            className="cursor-pointer w-8 h-8 md:w-10 md:h-10 rounded-md bg-prussian-blue-600 hover:bg-prussian-blue-400 flex items-center justify-center"
                        >
                            <PenIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </button>

                        <button
                            title="Promote"
                            aria-label="Promote"
                            className="cursor-pointer w-8 h-8 md:w-10 md:h-10 rounded-md border border-solid border-orange-400/60 bg-orange-300/40 hover:bg-orange-400 text-white-500 flex items-center justify-center"
                        >
                            <RocketIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </button>

                        <button
                            title="More options"
                            aria-label="More options"
                            className="cursor-pointer w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center border border-solid border-white-200 hover:bg-black-600/60"
                        >
                            <EllipsisIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-3 text-sm md:text-base text-white-400 justify-center md:justify-start">
                        <div className="flex items-center gap-1 min-w-18 justify-center md:justify-start text-center md:text-left">
                            <span className="font-semibold">{user.posts}</span>
                            <span className="ml-1">posts</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-27 justify-center md:justify-start text-center md:text-left">
                            <span className="font-semibold">{user.followers.toLocaleString()}</span>
                            <span className="ml-1">followers</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-22 justify-center md:justify-start text-center md:text-left">
                            <span className="font-semibold">{user.following}</span>
                            <span className="ml-1">following</span>
                        </div>
                    </div>

                    <div className="text-sm">
                        <div className="font-semibold">{user.name}</div>
                        <div className="md:flex md:flex-row md:gap-1">
                            {user.bio.map((line,i)=><div key={i} className="text-prussian-blue-700">&bull; {line}</div>)}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}