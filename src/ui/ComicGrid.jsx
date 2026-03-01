import { For } from "solid-js";
import { Eye, Heart, User, Star, BookOpen, Bookmark, Trash2 } from "lucide-solid";
import { isBookmarked, saveBookmark, removeBookmark } from "#utils/bookmarks";
import { addBookmark } from "#utils/actions.js";

export default function ComicGrid(props){
    const toggleBookmark = (comic) => {
        const id = comic.id ?? comic.name
        if (isBookmarked(id)) {
            removeBookmark(id)
            if (props.onToggleBookmark) props.onToggleBookmark(id, false)
            return
        }
        const group = window.prompt('Save to group (leave empty for "Saved")') || 'Saved'
        addBookmark(comic, group)
        if (props.onToggleBookmark) props.onToggleBookmark(id, true)
    }

    return(
        <div className="md:pl-20 px-6 py-6 pb-24 mb:pb-6 grid grid-cols-1 min-[550px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <For each={props.comics}>
                {(comic) => {
                    const id = comic.id ?? comic.name
                    const bookmarked = isBookmarked(id)
                    return (
                        <div className="bg-black-600/40 rounded-lg shadow-sm overflow-hidden hover:shadow-md active:shadow-md transition-all hover:scale-110 active:scale-110 duration-600 cursor-pointer">
                            <div className="relative">
                                <img src={comic.cover_url} alt={comic.name} className="w-full h-48 object-cover"/>
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-3">
                                    <h3 className="text-sm font-semibold text-white truncate">{comic.title}</h3>
                                    <div className="text-xs text-white/80 mt-1 truncate">{comic.author_name}</div>
                                </div>
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <div className="bg-prussian-blue-700 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                        <Heart size={14} />
                                        <span>{(comic.likes).toLocaleString()}</span>
                                    </div>
                                    <div className="bg-white-300 text-black-600 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                        <Eye size={14} />
                                        <span>{(comic.views).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="absolute top-2 left-2 flex gap-2">
                                    {!props.showDeleteButton ? (
                                        <button
                                            onClick={() => toggleBookmark(comic)}
                                            className={`p-2 rounded-full bg-black/60 text-white shadow-md ring-1 ring-white/10 border border-white/6 backdrop-blur-sm transition-colors ${bookmarked ? 'bg-yellow-500 text-black-800 hover:bg-yellow-600 active:bg-yellow-600' : 'hover:bg-prussian-blue-600 active:bg-prussian-blue-600'}`}
                                            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                                        >
                                            <Bookmark size={16} />
                                        </button>
                                    ) : null}

                                    {props.showDeleteButton ? (
                                        <button
                                            onClick={() => {
                                                const id = comic.id ?? comic.name
                                                if (props.onDelete) {
                                                    props.onDelete(comic)
                                                    return
                                                }
                                                if (!confirm(`Remove "${comic.name}" from bookmarks?`)) return
                                                removeBookmark(id)
                                                if (props.onToggleBookmark) props.onToggleBookmark(id, false)
                                            }}
                                            className="p-2 rounded-full bg-black/60 text-white shadow-md hover:bg-rose-600/90 active:bg-rose-600/90 transition-colors ring-1 ring-white/10 border border-white/6 backdrop-blur-sm"
                                            aria-label="Remove bookmark"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-prussian-blue-700">{comic.name}</h3>
                                        <div className="text-xs text-black-800 mt-1 flex items-center gap-2">
                                            <User size={12} />
                                            <span>{comic.username}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 justify-end">
                                            <Star size={14} className="text-orange-500" />
                                            <span className="text-sm font-medium">{comic.rating}</span>
                                        </div>
                                        <div className="text-xs text-black-800">{comic.updated_at}</div>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between text-xs text-black-900">
                                    <div className="flex items-center gap-2">
                                        <BookOpen size={14} />
                                        <span>{comic.episodes} eps</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <Eye size={12} />
                                            <span>{Math.round(comic.views / 1000)}k</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Heart size={12} />
                                            <span>{Math.round(comic.likes / 1000)}k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </For>
        </div>
    )
}