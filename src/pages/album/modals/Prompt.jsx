import { createSignal } from 'solid-js'

export default function PromptModal(props) {
    const [value, setValue] = createSignal(props.defaultValue ?? '')

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') props.onConfirm(value())
        if (e.key === 'Escape') props.onCancel()
    }

    return (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={props.onCancel}>
            <div
                class="w-full max-w-md rounded-2xl p-6 shadow-2xl overflow-hidden bg-prussian-blue-700/60"
                onClick={e => e.stopPropagation()}
            >
                <h3 class="text-white-400 text-lg font-semibold mb-3">{props.title}</h3>
                <input
                    class="w-full bg-orange-300/30 text-white-500 rounded-md px-3 py-2 outline-none placeholder:text-white-300/60 border border-orange-500/30 mb-4 focus:ring-2 focus:ring-orange-700/20"
                    value={value()}
                    onInput={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autofocus
                />
                <div class="flex justify-end gap-3">
                    <button
                        onClick={props.onCancel}
                        class="cursor-pointer px-4 py-2 bg-black-300/40 hover:bg-black-400/80 active:bg-black-400/80 text-white-400 rounded-md transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => props.onConfirm(value())}
                        class="cursor-pointer px-4 py-2 bg-orange-300 hover:bg-orange-400 active:bg-orange-400 text-white-500 rounded-md shadow-sm transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}