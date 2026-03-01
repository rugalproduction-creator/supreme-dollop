import { createMemo, Show } from 'solid-js'
import { Trash2, PenIcon } from 'lucide-solid'

export default function GroupCard(props) {
    // Deterministic: always first comic — avoids flickering on re-render
    const preview = createMemo(() => {
        const comics = (props.items ?? []).map(i => i && (i.comic ?? i)).filter(Boolean)
        return comics[0] ?? null
    })

    return (
        <div
            class="rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform cursor-pointer"
            onClick={props.onOpen}
        >
            <div class="relative bg-linear-to-br from-prussian-blue-700 to-black-600">
                <Show
                    when={preview()}
                    fallback={<div class="w-full h-44 bg-black-500 flex items-center justify-center text-white-300">No cover</div>}
                >
                    {p => <img src={p().cover} alt={p().name} class="w-full h-44 object-cover opacity-95" />}
                </Show>

                <div class="absolute inset-0 bg-linear-to-t from-black-700/60 to-transparent" />

                <div class="absolute left-4 bottom-4">
                    <h3 class="text-lg font-semibold text-white-500">{props.groupName}</h3>
                    <div class="text-sm text-white-500">
                        {props.items.length} book{props.items.length !== 1 ? 's' : ''}
                    </div>
                </div>

                {/* Stop propagation so card clicks don't fire when using action buttons */}
                <div class="absolute right-3 top-3 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <button onClick={props.onRename} class="p-2 bg-white-100/40 rounded-md cursor-pointer hover:scale-110"><PenIcon size={16} /></button>
                    <button onClick={props.onDelete} class="p-2 bg-red-600/60 rounded-md cursor-pointer hover:scale-110"><Trash2 size={16} /></button>
                </div>
            </div>
        </div>
    )
}