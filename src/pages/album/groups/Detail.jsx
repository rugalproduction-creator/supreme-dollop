import { createMemo } from 'solid-js'
import { Trash2, ChevronLeft, PenIcon } from 'lucide-solid'
import ComicGrid from '#ui/ComicGrid'

export default function GroupDetail(props) {
    const comics = createMemo(() =>
        (props.items ?? []).map(i => i && (i.comic ?? i)).filter(Boolean)
    )

    return (
        <section class="mb-8">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <button onClick={props.onBack} class="p-2 bg-white-100/10 rounded-md">
                        <ChevronLeft size={18} />
                    </button>
                    <h2 class="text-2xl text-white-300 font-bold">{props.groupName}</h2>
                    <div class="text-sm text-white-300/70 ml-3">
                        {props.items.length} book{props.items.length !== 1 ? 's' : ''}
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onClick={props.onRename} class="p-2 bg-white-100/10 rounded-md"><PenIcon size={16} /></button>
                    <button onClick={props.onDelete} class="p-2 bg-red-600/60 rounded-md"><Trash2 size={16} /></button>
                </div>
            </div>

            <ComicGrid
                comics={comics()}
                onToggleBookmark={props.onToggleBookmark}
                showDeleteButton={true}
                onDelete={props.onDeleteComic}
            />
        </section>
    )
}