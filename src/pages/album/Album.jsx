import { createSignal, createMemo, onMount, For, Show } from 'solid-js'
import { Frown } from 'lucide-solid'
import { getGroups, getBookmarks, removeBookmark, moveBookmark, isBookmarked, saveBookmark } from '#utils/bookmarks'
import PromptModal from './modals/Prompt'
import ConfirmModal from './modals/Confirmation'
import GroupCard from './groups/Card'
import GroupDetail from './groups/Detail'

export default function Album() {
    const [groups, setGroups] = createSignal({})
    const [bookmarkCount, setBookmarkCount] = createSignal(0) // reactive, not called raw in render
    const [openGroup, setOpenGroup] = createSignal(null) // null = grid view

    // Modal state — null when hidden
    const [promptModal, setPromptModal] = createSignal(null)
    const [confirmModal, setConfirmModal] = createSignal(null)

    const load = () => {
        const all = getBookmarks()
        setGroups(getGroups())
        setBookmarkCount(all.length)
    }

    onMount(load)

    // Promise-based modal helpers so callers stay readable
    const showPrompt = (title, defaultValue = '') =>
        new Promise(resolve => {
            setPromptModal({
                title,
                defaultValue,
                onConfirm: (val) => { setPromptModal(null); resolve(val) },
                onCancel:  ()    => { setPromptModal(null); resolve(null) },
            })
        })

    const showConfirm = (message) =>
        new Promise(resolve => {
            setConfirmModal({
                message,
                onConfirm: () => { setConfirmModal(null); resolve(true)  },
                onCancel:  () => { setConfirmModal(null); resolve(false) },
            })
        })

    // ------------------------------------------------------------------

    const toggleBookmark = async (comic) => {
        const id = comic.id ?? comic.name
        if (isBookmarked(id)) {
            removeBookmark(id)
            load()
            return
        }
        const group = await showPrompt('Save to group (leave empty for "Saved")', 'Saved')
        if (group === null) return // user cancelled
        saveBookmark(comic, group.trim() || 'Saved')
        load()
    }

    const renameGroup = async (oldName) => {
        const newName = await showPrompt('Rename group', oldName)
        if (!newName || newName.trim() === oldName) return
        getBookmarks().forEach(item => {
            if ((item.group ?? 'Saved') === oldName) moveBookmark(item.id, newName.trim())
        })
        // Keep the detail view open and follow the rename
        if (openGroup() === oldName) setOpenGroup(newName.trim())
        load()
    }

    const deleteGroup = async (name) => {
        const confirmed = await showConfirm(`Delete group "${name}" and remove its bookmarks?`)
        if (!confirmed) return
        getBookmarks().forEach(item => {
            if ((item.group ?? 'Saved') === name) removeBookmark(item.id)
        })
        if (openGroup() === name) setOpenGroup(null)
        load()
    }

    const deleteComic = async (comic) => {
        const confirmed = await showConfirm(`Remove "${comic.name}" from bookmarks?`)
        if (!confirmed) return
        removeBookmark(comic.id ?? comic.name)
        load()
    }

    // Derive current group items reactively
    const currentItems = createMemo(() => {
        const name = openGroup()
        return name ? (groups()[name] ?? []) : []
    })

    // ------------------------------------------------------------------

    return (
        <div class="p-6 md:pl-20 overflow-y-scroll h-screen">

            {/* Modals rendered at the top of the tree */}
            <Show when={promptModal()}>
                {m => <PromptModal {...m()} />}
            </Show>
            <Show when={confirmModal()}>
                {m => <ConfirmModal {...m()} />}
            </Show>

            <h1 class="text-2xl text-white-300 font-bold mb-4">Your Album</h1>

            <div class="flex items-center gap-3 mb-4">
                <button onClick={load} class="px-3 py-1 bg-white-100/10 rounded-md">Refresh</button>
                {/* bookmarkCount() is a signal — reactive */}
                <div class="text-sm text-white-300/70">{bookmarkCount()} bookmark(s) stored</div>
            </div>

            <Show
                when={openGroup()}
                fallback={
                    <>
                        <Show when={Object.keys(groups()).length === 0}>
                            <div class="empty-center">
                                <Frown size={72} class="text-white-300/60" />
                                <div class="text-lg text-white-300 font-semibold">No grouped books found.</div>
                                <div class="empty-sub text-sm">You can bookmark comics from the library view, and organize them into groups here.</div>
                            </div>
                        </Show>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <For each={Object.entries(groups())}>
                                {([groupName, items]) => (
                                    <GroupCard
                                        groupName={groupName}
                                        items={items}
                                        onOpen={() => setOpenGroup(groupName)}
                                        onRename={() => renameGroup(groupName)}
                                        onDelete={() => deleteGroup(groupName)}
                                    />
                                )}
                            </For>
                        </div>
                    </>
                }
            >
                <GroupDetail
                    groupName={openGroup()}
                    items={currentItems()}
                    onBack={() => setOpenGroup(null)}
                    onRename={() => renameGroup(openGroup())}
                    onDelete={() => deleteGroup(openGroup())}
                    onToggleBookmark={toggleBookmark}
                    onDeleteComic={deleteComic}
                />
            </Show>
        </div>
    )
}