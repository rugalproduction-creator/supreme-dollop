import { createAsync, useParams, useNavigate } from "@solidjs/router";
import { createEffect, For, Show } from "solid-js";
import { storyLoader } from "#utils/loaders.js";
import { ArrowLeft, Eye, Heart, Star, Frown } from "lucide-solid";

export default function Comic() {
    const params = useParams();
    const navigate = useNavigate();
    const content = createAsync(() => storyLoader({ params: { id: params.id } }));

    createEffect(() => console.log(content()));

    const openChapter = (chapter) => {
        // placeholder navigation — adapt to your reader route if available
        navigate(`${encodeURIComponent(chapter.chapter_number)}`);
    }

    return (
        <div class="p-6 md:pl-20 overflow-y-scroll h-screen">
            <div class="mb-6 cursor-pointer bg-alabaster-grey-200/20 hover:bg-alabaster-grey-200/40 p-1 rounded-full w-fit" onClick={() => navigate(-1)}>
                <ArrowLeft class="scale-75"/>
            </div>
            <Show when={content()} fallback={<div class="text-white-300">Loading...</div>}>
                {() => (
                    <>
                        <div class="rounded-lg overflow-hidden shadow-2xl bg-prussian-blue-600/40">
                            <div class="p-6 flex gap-x-12 md:grid-cols-2">
                                <div class="flex justify-center md:justify-start">
                                    <img src={content().manga.cover_url} alt={content().manga.title} class="w-48 h-72 object-cover rounded-lg shadow-inner border-2 border-white-100/6"/>
                                </div>

                                <div class="pt-4">
                                    <div class="flex items-start justify-between gap-4">
                                        <div class="flex-1">
                                            <h1 class="text-4xl text-white-300 font-oswald font-bold leading-tight">{content().manga.title}</h1>
                                            <div class="mt-3 flex flex-wrap gap-3 items-center">
                                                <div class="text-xs px-3 py-1 rounded-full bg-orange-400/40 text-orange-400">{content().manga.content_type}</div>
                                                <div class="text-xs px-3 py-1 rounded-full bg-orange-400/40 text-orange-400">{content().manga.status}</div>
                                                {content().manga.genre?.map(g => (
                                                    <div class="text-xs text-white-300/80 px-3 py-1 rounded-full bg-black-400/40">{g}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-5 text-white-300/85 max-w-4xl leading-relaxed text-sm">
                                        {content().manga.description}
                                    </div>

                                    <div class="mt-6 flex items-center gap-6 text-sm text-white-300/80">
                                        <div class="flex items-center">
                                            <span class="font-semibold scale-75"><Eye/></span>
                                            <span>{Number(content().manga.views).toLocaleString()}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <span class="font-semibold scale-75"><Heart/></span>
                                            <span>{Number(content().manga.likes).toLocaleString()}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <span class="font-semibold scale-75"><Star/></span>
                                            <span>{Number(content().manga.rating).toLocaleString()}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <span class="font-semibold">Updated:</span>
                                            <span>{content().manga.updated_at ?? '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-8">
                            <h2 class="text-2xl text-white-300 font-semibold mb-4">Chapters</h2>

                            <div class="grid gap-3">
                                <For each={content().chapters} fallback={
                                    <div className="empty-center">
                                        <Frown size={72} class="text-white-300/60" />
                                        <div>Nothing here yet.</div>
                                    </div>}>
                                    {(chapter, idx) => {
                                        const even = idx() % 2 === 0
                                        return (
                                            <button class="w-full text-left bg-prussian-blue-100 cursor-pointer p-4 rounded-lg flex items-center justify-between transition-all hover:scale-[1.02]" onClick={() => openChapter(chapter)}>
                                                <div class="flex items-center gap-4">
                                                    <div class="w-12 h-12 flex items-center justify-center rounded-md" style={{"background":"linear-gradient(135deg,var(--color-prussian-blue-600),var(--color-prussian-blue-400))","color":"white","font-weight":"700"}}>{chapter.chapter_number}</div>
                                                    <div>
                                                        <div class="text-sm font-semibold text-white-300 truncate" style={{'max-width':'48rem'}}>{chapter.title}</div>
                                                        <div class="text-xs text-white-300/70 mt-1">{chapter.page_count} pages • {new Date(chapter.created_at).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    }}
                                </For>
                            </div>
                        </div>
                    </>
                )}
            </Show>
        </div>
    )
}