import { For, Show, createSignal } from 'solid-js'
import { createAsync, useNavigate } from '@solidjs/router'
import { Book, PlusCircle, Frown, Trash2 } from 'lucide-solid'
import { booksLoader } from '#utils/loaders.js'
import DeletePopup from './DeletePopup.jsx'
import { supabase } from '#utils/supabase'

export default function Publish() {
    const navigate = useNavigate();
    const books = createAsync(() => booksLoader());
    
    const [showDelete, setShowDelete] = createSignal(false)
    const [selectedBook, setSelectedBook] = createSignal(null)

    const openDelete = (book, e) => {
        e?.stopPropagation()
        setSelectedBook(book)
        setShowDelete(true)
    }

    const deleteBookConfirmed = async () => {
        const book = selectedBook()
        if (!book) {
            setShowDelete(false)
            return
        }

        const { error } = await supabase.from('content').delete().eq('id', book.id)
        if (error) {
            console.error('Error deleting book:', error)
            setShowDelete(false)
            return
        }

        setShowDelete(false)
        // Simple refresh to update list
        window.location.reload()
    }

    const openBook = (id) => navigate(`/comics/${id}`)
    const goCreate = () => navigate('/publish/create')

    return (
        <div class="p-6 md:pl-20 overflow-y-scroll h-screen">
            <header class="px-6 pt-8 pb-6 border-b border-white-100/10">
                <div class="flex items-start justify-between max-w-5xl mx-auto">
                    <div class="flex flex-col gap-3">
                        <div class="flex items-center gap-2 text-white-300 text-xs uppercase tracking-widest">
                            <Book size={12} />
                            <span>Library</span>
                            <span class="text-white-100/30">/</span>
                            <span class="text-orange-500">My Titles</span>
                        </div>

                        <div>
                            <h1 class="font-oswald font-bold text-white-500 text-4xl leading-none tracking-tight">My Published Titles</h1>
                            <p class="text-white-300 text-sm mt-2 max-w-sm leading-relaxed">Manage your titles and publish new chapters.</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <button onClick={goCreate} class="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-prussian-blue-600 text-white-500/80 font-bold hover:bg-prussian-blue-500 transition-colors">
                            <PlusCircle size={16} />
                            <span class="text-sm">Create Title</span>
                        </button>
                    </div>
                </div>
            </header>

            <main class="max-w-5xl mx-auto p-6">
                <Show when={books() !== undefined} fallback={<div class="text-white-300">Loading...</div>}>
                    <Show when={books().length > 0} fallback={
                        <div class="empty-center">
                            <Frown size={72} class="text-white-300/60" />
                            <div class="text-lg text-white-300 font-semibold">You haven't published any titles yet.</div>
                            <div class="empty-sub text-sm">Create your first title to start publishing chapters.</div>
                            <div class="mt-4">
                                <button onClick={goCreate} class="cursor-pointer px-4 py-2 bg-orange-500 text-black rounded-md font-semibold hover:bg-orange-400">Create a Title</button>
                            </div>
                        </div>
                    }>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <For each={books()}>
                                {book => (
                                    <div class="rounded-lg overflow-hidden shadow-lg cursor-pointer bg-prussian-blue-600/30 transition-transform hover:-translate-y-1" onClick={() => openBook(book.id)}>
                                        <div class="relative">
                                            <img src={book.cover_url ?? '/jjk.jpg'} alt={book.title} class="w-full h-48 object-cover" />
                                            <div class="absolute inset-0 bg-black/40" />
                                            <div class="absolute left-4 bottom-4">
                                                <h3 class="text-lg font-semibold text-white-500">{book.title}</h3>
                                                <div class="text-sm text-white-500 mt-1">{(book.chapters ?? book.chapter_count ?? 0)} chapter{(book.chapters ?? book.chapter_count ?? 0) !== 1 ? 's' : ''}</div>
                                            </div>
                                            <div class="absolute right-3 top-3 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                                <button onClick={e => openDelete(book, e)} class="cursor-pointer px-3 py-1 bg-alabaster-grey-200/20 hover:bg-red-900/20 hover:text-red-500 rounded-md text-sm"><Trash2 /></button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>
                    </Show>
                </Show>
            </main>

            <Show when={showDelete()}>
                <DeletePopup
                    message={`Are you sure you want to delete "${selectedBook()?.title}"?`}
                    onCancel={() => setShowDelete(false)}
                    onConfirm={deleteBookConfirmed}
                />
            </Show>
        </div>
    )
}