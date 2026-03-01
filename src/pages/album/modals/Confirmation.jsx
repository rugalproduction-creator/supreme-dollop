export default function ConfirmModal(props) {
    return (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={props.onCancel}>
            <div
                class="w-full max-w-md rounded-2xl p-6 shadow-2xl overflow-hidden ring-1 ring-white/5 border border-white/6 bg-linear-to-br from-prussian-blue-700/80 to-black-600/70"
                onClick={e => e.stopPropagation()}
            >
                <h3 class="text-white-500 text-lg font-semibold mb-2">Are you sure?</h3>
                <p class="text-white-400 text-sm mb-4">{props.message}</p>
                <div class="flex justify-end gap-3">
                    <button
                        onClick={props.onCancel}
                        class="cursor-pointer px-4 py-2 bg-black-300/40 hover:bg-black-400/80 text-white-400 rounded-md transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={props.onConfirm}
                        class="cursor-pointer px-4 py-2 bg-orange-300 hover:bg-orange-400 text-white-500 rounded-md shadow-sm transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
