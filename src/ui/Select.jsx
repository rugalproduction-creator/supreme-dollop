import { createSignal, createEffect, onCleanup, For, Show } from 'solid-js'

export default function Select(props) {
  let triggerRef
  let listboxRef

  const [open, setOpen] = createSignal(false)
  const [focused, setFocused] = createSignal(false)
  const [activeIndex, setActiveIndex] = createSignal(-1)

  const opts = () => props.options || []
  const selected = () => opts().find(o => o.value === props.value) ?? null
  const hasValue = () => selected() !== null
  const floatLabel = () => hasValue() || open() || focused()

  const handleOutside = (e) => {
    if (!triggerRef?.contains(e.target) && !listboxRef?.contains(e.target)) {
      setOpen(false)
      setFocused(false)
    }
  }
  createEffect(() => {
    document.addEventListener('mousedown', open() ? handleOutside : null)
  })
  onCleanup(() => document.removeEventListener('mousedown', handleOutside))

  const handleKeyDown = (e) => {
    if (props.disabled) return
    const len = opts().length
    switch (e.key) {
      case 'Enter': case ' ':
        e.preventDefault()
        if (!open()) { setOpen(true); setActiveIndex(opts().findIndex(o => o.value === props.value)) }
        else if (activeIndex() >= 0) choose(opts()[activeIndex()])
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open()) { setOpen(true); setActiveIndex(0) }
        else setActiveIndex(i => (i + 1) % len)
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open()) { setOpen(true); setActiveIndex(len - 1) }
        else setActiveIndex(i => (i - 1 + len) % len)
        break
      case 'Escape': setOpen(false); triggerRef?.focus(); break
      case 'Tab':    setOpen(false); break
    }
  }

  const choose = (opt) => {
    props.onChange?.(opt.value)
    setOpen(false)
    triggerRef?.focus()
  }

  const toggle = () => {
    if (props.disabled) return
    setOpen(v => !v)
    setFocused(true)
    if (!open()) setActiveIndex(opts().findIndex(o => o.value === props.value))
  }

  return (
    <div class="relative font-mono text-sm text-white">

      {/* ── trigger ── */}
      <div
        ref={triggerRef}
        class={[
          'relative flex items-center gap-2 min-h-[52px] px-3.5 pt-[18px] pb-1.5',
          'bg-white/5 rounded-xl border cursor-pointer outline-none select-none',
          'transition-all duration-150',
          props.error
            ? 'border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.12)]'
            : open() || focused()
              ? 'border-white/50 shadow-[0_0_0_3px_rgba(255,255,255,0.06)]'
              : 'border-white/10 hover:border-white/20 hover:bg-white/[0.07]',
          props.disabled && 'opacity-40 cursor-not-allowed',
        ].join(' ')}
        tabIndex={props.disabled ? -1 : 0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open()}
        aria-disabled={props.disabled}
        onClick={toggle}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { if (!listboxRef?.contains(e.relatedTarget)) setFocused(false) }}
        onKeyDown={handleKeyDown}
      >
        {/* icon */}
        <Show when={props.icon}>
          <span class={`flex items-center shrink-0 transition-colors duration-150 ${open() || focused() ? 'text-lime-300' : 'text-white/35'}`}>
            <props.icon />
          </span>
        </Show>

        {/* floating label */}
        <label
          class={[
            'absolute pointer-events-none transition-all duration-150 whitespace-nowrap',
            props.icon ? 'left-10' : 'left-3.5',
            floatLabel()
              ? 'top-2.5 text-[10.5px] tracking-widest uppercase text-lime-300'
              : 'top-1/2 -translate-y-1/2 text-sm text-white/35',
          ].join(' ')}
        >
          {props.label}
        </label>

        {/* value */}
        <span class={`flex-1 truncate pt-0.5 ${hasValue() ? 'text-white' : 'text-white/30'}`}>
          {hasValue() ? selected().label : (props.placeholder ?? '')}
        </span>

        {/* chevron */}
        <span class={`flex items-center shrink-0 transition-all duration-200 ${open() ? 'rotate-180 text-white' : 'text-white/35'}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>

      {/* ── listbox ── */}
      <Show when={open()}>
        <ul
          ref={listboxRef}
          class="absolute z-50 top-[calc(100%+6px)] left-0 right-0 p-1.5 rounded-xl border border-white/10 bg-[#1c1c22] shadow-[0_16px_40px_rgba(0,0,0,0.6)] max-h-60 overflow-y-auto scrollbar-thin list-none m-0 animate-in fade-in slide-in-from-top-1 duration-150"
          role="listbox"
        >
          <For each={opts()}>
            {(opt, i) => (
              <li
                class={[
                  'relative flex items-center pl-8 pr-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-100',
                  opt.value === props.value ? 'text-lime-300 font-medium' : 'text-white/70 hover:bg-white/5 hover:text-white',
                  i() === activeIndex() ? 'bg-white/5 text-white' : '',
                ].join(' ')}
                role="option"
                aria-selected={opt.value === props.value}
                onMouseEnter={() => setActiveIndex(i())}
                onMouseDown={(e) => { e.preventDefault(); choose(opt) }}
              >
                <Show when={opt.value === props.value}>
                  <span class="absolute left-2.5 flex items-center text-lime-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </Show>
                {opt.label}
              </li>
            )}
          </For>
        </ul>
      </Show>

      {/* ── error ── */}
      <Show when={props.error}>
        <p class="mt-1.5 mx-0.5 text-xs text-red-400 tracking-wide" role="alert">
          {props.error}
        </p>
      </Show>
    </div>
  )
}