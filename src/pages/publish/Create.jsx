import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import Input from '#ui/Input'
import TextArea from '#ui/TextArea'
import Select from '#ui/Select'
import { Hash, Book, FileText, Image as ImageIcon, Tags, Layers, Upload, X, CheckCircle2, ArrowLeft } from 'lucide-solid'
import { publishContent } from '#utils/actions.js'

const GENRES = [
  'Action','Adventure','Comedy','Drama','Fantasy',
  'Horror','Mystery','Romance','Sci-Fi','Slice of Life'
]

const TYPE_OPTIONS   = [{ value: 'manga', label: 'Manga' }, { value: 'comic', label: 'Comic' }]
const STATUS_OPTIONS = [{ value: 'ongoing', label: 'Ongoing' }, { value: 'complete', label: 'Complete' }]

export default function Create() {
  const [title, setTitle] = createSignal('')
  const [chapters, setChapters] = createSignal('1')
  const [description, setDescription] = createSignal('')
  const [type, setType] = createSignal('manga')
  const [status, setStatus] = createSignal('ongoing')
  const [selectedGenres, setSelectedGenres] = createSignal([])
  const [coverFile, setCoverFile] = createSignal(null)
  const [coverPreview, setCoverPreview] = createSignal(null)
  const [dragging, setDragging] = createSignal(false)
  let fileInput

  const navigate = useNavigate();

  const toggleGenre = (g) =>
    setSelectedGenres(prev =>
      prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
    )

  const applyFile = (f) => {
    if (!f || !f.type.startsWith('image/')) return
    setCoverFile(f)
    setCoverPreview(URL.createObjectURL(f))
  }

  const onCoverChange = (e) => applyFile(e.target.files?.[0])
  const onDrop        = (e) => { e.preventDefault(); setDragging(false); applyFile(e.dataTransfer.files?.[0]) }
  const clearCover    = (e) => { e.stopPropagation(); setCoverFile(null); setCoverPreview(null) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await publishContent({
            title: title(),
            chapters: chapters(),
            description: description(),
            type: type(),
            status: status(),
            genres: selectedGenres(),
            cover: coverFile()
        })
        navigate(-1);
    } catch (err) {
        console.error('Publish failed:', err.message ?? err)
    }
}
  return (
    <div class="h-screen overflow-y-scroll text-white-400 mt-4">
        <div class="fixed top-4 left-[5%] mb-6 cursor-pointer bg-alabaster-grey-200/20 hover:bg-alabaster-grey-200/40 p-1 rounded-full w-fit" onClick={() => navigate(-1)}>
            <ArrowLeft class="scale-75"/>
        </div>

      {/* ── header ───────────────────────────────────────────────── */}
      <header class="px-6 pt-8 pb-6 border-b border-white-100/10">
        <div class="flex items-start justify-between max-w-5xl mx-auto">

          <div class="flex flex-col gap-3">
            {/* breadcrumb */}
            <div class="flex items-center gap-2 text-white-300 text-xs uppercase tracking-widest">
              <Book size={12} />
              <span>Library</span>
              <span class="text-white-100/30">/</span>
              <span class="text-orange-500">New Title</span>
            </div>

            <div>
              <h1 class="font-oswald font-bold text-white-500 text-4xl leading-none tracking-tight">
                Publish a Title
              </h1>
              <p class="text-white-300 text-sm mt-2 max-w-sm leading-relaxed">
                Fill in the details below to list your manga or comic on the platform.
              </p>
            </div>
          </div>

          <button
            type="submit"
            form="publish-form"
            class="mt-1 px-5 py-2.5 rounded-lg bg-orange-500 text-black text-sm font-bold tracking-wide hover:bg-orange-400 transition-colors duration-150 active:scale-[0.97] shrink-0 cursor-pointer"
          >
            Publish
          </button>
        </div>
      </header>

      {/* ── form ─────────────────────────────────────────────────── */}
      <form
        id="publish-form"
        onSubmit={handleSubmit}
        class="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* ── left / main ──────────────────────────────────────── */}
        <div class="md:col-span-2 flex flex-col gap-5">

          <Input id="title" label="Title" onChange={setTitle} icon={Book} />

          <div class="grid grid-cols-[1fr_2fr] gap-3">
            <Input id="chapters" label="Chapters" type="number" onChange={setChapters} icon={Hash} />
            <Select
              id="type" label="Type"
              options={TYPE_OPTIONS}
              value={type()}
              onChange={setType}
              icon={Layers}
            />
          </div>

          <TextArea id="description" label="Description" rows={5} onChange={setDescription} icon={FileText} />

          {/* genres */}
          <div>
            <p class="flex items-center gap-1.5 text-white-300 text-xs uppercase tracking-widest mb-3">
              <Tags size={13} /> Genres
            </p>
            <div class="flex flex-wrap gap-2">
              {GENRES.map(g => {
                const active = () => selectedGenres().includes(g)
                return (
                  <button
                    type="button"
                    onClick={() => toggleGenre(g)}
                    class={[
                      'px-3 py-1 rounded-full text-xs border transition-all duration-150 font-medium',
                      active()
                        ? 'bg-orange-500 text-black border-orange-500'
                        : 'bg-transparent text-white-300 border-white-100/20 hover:border-orange-500/50 hover:text-white-400',
                    ].join(' ')}
                  >
                    {g}
                  </button>
                )
              })}
            </div>
          </div>

          {/* status */}
          <div class="flex items-center gap-3 pt-1">
            <p class="text-white-300 text-xs uppercase tracking-widest mr-1">Status</p>
            {STATUS_OPTIONS.map(s => {
              const active = () => status() === s.value
              return (
                <button
                  type="button"
                  onClick={() => setStatus(s.value)}
                  aria-pressed={active()}
                  class={[
                    'flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150',
                    active()
                      ? 'bg-orange-500 text-black border-orange-500'
                      : 'bg-transparent text-white-300 border-white-100/15 hover:border-orange-500/40',
                  ].join(' ')}
                >
                  {active() && <CheckCircle2 size={12} />}
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── right / cover ────────────────────────────────────── */}
        <aside class="md:col-span-1">
          <p class="flex items-center gap-1.5 text-white-300 text-xs uppercase tracking-widest mb-3">
            <ImageIcon size={13} /> Cover Image
          </p>

          <div
            class={[
              'relative w-full aspect-[2/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all duration-150 group',
              dragging()
                ? 'border-orange-500 bg-orange-500/5'
                : coverPreview()
                  ? 'border-transparent'
                  : 'border-white-100/15 hover:border-orange-500/40 bg-white-100/5 hover:bg-white-100/[0.07]',
            ].join(' ')}
            onClick={() => fileInput?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <input ref={el => fileInput = el} type="file" accept="image/*" onChange={onCoverChange} class="hidden" />

            {coverPreview()
              ? <>
                  <img src={coverPreview()} alt="Cover preview" class="absolute inset-0 w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
                    <Upload size={20} class="text-white-400" />
                    <span class="text-white-400 text-xs">Replace</span>
                  </div>
                  <button
                    type="button"
                    onClick={clearCover}
                    class="absolute top-2 right-2 size-6 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                  >
                    <X size={12} color="white" />
                  </button>
                </>
              : <>
                  <Upload size={24} class={`mb-2 transition-colors ${dragging() ? 'text-orange-500' : 'text-white-200'}`} />
                  <p class="text-white-300 text-xs text-center px-4">
                    {dragging() ? 'Drop to upload' : 'Click or drag & drop'}
                  </p>
                  <p class="text-white-200 text-[10px] mt-1">PNG, JPG, WEBP</p>
                </>
            }
          </div>

          {coverFile() &&
            <p class="mt-2 text-white-300 text-[11px] truncate px-1">{coverFile().name}</p>
          }
        </aside>
      </form>
    </div>
  )
}