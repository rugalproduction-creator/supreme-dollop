import ComicGrid from "#ui/ComicGrid.jsx";
import { LayoutGrid, User, Tag, Frown, Tags } from "lucide-solid";

export default function AccountContent(props) {
    const { activeTab, setActiveTab, samplePosts } = props

    return (
        <div className="mt-6 border-t border-solid border-white-200 pt-4">
            <div className="flex items-center gap-8 justify-center md:justify-start mb-4 text-black-700">
                <button className={`cursor-pointer flex items-center gap-2 px-4 py-2 ${activeTab() === 'posts' ? 'text-prussian-blue-700 font-semibold border-t-2 border-prussian-blue-700' : ''}`} onClick={()=>setActiveTab('posts')}><LayoutGrid size={16}/> POSTS</button>
                <button className={`cursor-pointer flex items-center gap-2 px-4 py-2 ${activeTab() === 'books' ? 'text-prussian-blue-700 font-semibold border-t-2 border-prussian-blue-700' : ''}`} onClick={()=>setActiveTab('books')}><User size={16}/> BOOKS</button>
                <button className={`cursor-pointer flex items-center gap-2 px-4 py-2 ${activeTab() === 'tags' ? 'text-prussian-blue-700 font-semibold border-t-2 border-prussian-blue-700' : ''}`} onClick={()=>setActiveTab('tags')}><Tag size={16}/> TAGGED</button>
            </div>

            <div>
                {activeTab() === 'posts' && (
                    <ComicGrid comics={samplePosts} />
                )}

                {activeTab() === 'books' && (
                    <div className="empty-center">
                        <Frown size={72} class="text-white-300/60" />
                        <div>Nothing here yet.</div>
                    </div>
                )}

                {activeTab() === 'tags' && (
                    <div className="empty-center">
                        <Tags size={72} class="text-white-300/60" />
                        <div>Tags will appear here.</div>
                    </div>
                )}
            </div>
        </div>
    )
}