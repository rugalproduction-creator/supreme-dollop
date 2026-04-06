import { createSignal, onMount } from 'solid-js'
import { Trash2, X } from 'lucide-solid'

export default function ConfirmModal({ message, onCancel, onConfirm }) {
    const [visible, setVisible] = createSignal(false)
    const [confirming, setConfirming] = createSignal(false)
    const [held, setHeld] = createSignal(0)
    let holdInterval = null

    onMount(() => requestAnimationFrame(() => setVisible(true)))

    const animatedClose = (cb) => {
        setVisible(false)
        setTimeout(cb, 250)
    }

    const startHold = () => {
        if (confirming()) return
        holdInterval = setInterval(() => {
            setHeld(h => {
                if (h >= 100) {
                    clearInterval(holdInterval)
                    triggerConfirm()
                    return 100
                }
                return h + 4
            })
        }, 20)
    }

    const cancelHold = () => {
        clearInterval(holdInterval)
        if (held() < 100) setHeld(0)
    }

    const triggerConfirm = async () => {
        setConfirming(true)
        await new Promise(r => setTimeout(r, 300))
        animatedClose(onConfirm)
    }

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) animatedClose(onCancel)
    }

    return (
        <div
            onClick={handleBackdrop}
            class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-250"
            style={{ background: 'rgba(5, 10, 20, 0.75)', opacity: visible() ? 1 : 0 }}
        >
            <div
                class="relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/7 transition-all duration-280"
                style={{
                    background: 'linear-gradient(160deg, #0d1b2a 0%, #0a1520 100%)',
                    'box-shadow': '0 32px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.03)',
                    transform: visible() ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
                    opacity: visible() ? 1 : 0,
                    'transition-timing-function': 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {/* Danger gradient top strip */}
                <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-orange-500 opacity-80" />

                {/* Header */}
                <div class="px-6 pt-6">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex size-11 shrink-0 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/12 text-red-400">
                            <Trash2 size={20} />
                        </div>
                        <button
                            onClick={() => animatedClose(onCancel)}
                            class="cursor-pointer flex items-center justify-center rounded-lg border border-white/8 bg-white/5 p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div class="mt-4">
                        <h2 class="text-lg/tight font-bold tracking-tight text-white/92">
                            Confirm Deletion
                        </h2>
                        <p class="mt-2 text-sm/relaxed text-white/45">
                            {message}
                        </p>
                    </div>
                </div>

                {/* Warning callout */}
                <div class="mx-6 mt-5 rounded-lg border border-red-500/18 bg-red-500/7 px-3.5 py-2.5 text-xs/relaxed text-red-400/75">
                    ⚠️ All chapters and associated data will be permanently removed.
                </div>

                {/* Actions */}
                <div class="flex gap-2.5 px-6 py-5">
                    {/* Cancel */}
                    <button
                        onClick={() => animatedClose(onCancel)}
                        class="cursor-pointer flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/65 transition-colors hover:bg-white/9 hover:text-white/90"
                    >
                        Cancel
                    </button>

                    {/* Hold-to-delete */}
                    <button
                        onMouseDown={startHold}
                        onMouseUp={cancelHold}
                        onMouseLeave={cancelHold}
                        onTouchStart={startHold}
                        onTouchEnd={cancelHold}
                        class="relative flex-[1.4] cursor-pointer select-none overflow-hidden rounded-xl border border-red-500/35 bg-red-500/15 px-4 py-2.5 text-sm font-bold text-red-300 transition-colors hover:bg-red-500/20"
                    >
                        {/* Fill bar */}
                        <div
                            class="absolute inset-0 rounded-[inherit] bg-red-500/35"
                            style={{
                                width: `${held()}%`,
                                transition: held() === 0 ? 'width 0.2s ease' : 'none',
                            }}
                        />
                        <span class="relative z-10 flex items-center justify-center gap-1.5">
                            <Trash2 size={14} />
                            {confirming() ? 'Deleting…' : held() > 0 ? 'Keep holding…' : 'Hold to Delete'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}