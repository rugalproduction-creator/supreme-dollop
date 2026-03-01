import { createSignal } from "solid-js";
import AccountOverview from "./Overview";
import AccountHighlight from "./Highlight";
import AccountContent from "./Content";

export default function Account(){
    const [activeTab, setActiveTab] = createSignal('posts')

    const user = {
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop',
        username: 'rugal.creates',
        name: 'Rugal Productions',
        posts: 24,
        followers: 12500,
        following: 320,
        bio: ["Comic lover", "Creator", "Sharing my work and inspirations. DM for collabs."],
    }

    const samplePosts = Array.from({length:12}).map((_,i)=>({
        id: i+1,
        cover: `https://picsum.photos/seed/account-${i}/600/600`,
        name: `Post ${i+1}`,
        author: user.username,
        views: Math.floor(1000 + Math.random()*100000),
        likes: Math.floor(50 + Math.random()*5000),
        episodes: 1,
        rating: (3 + Math.random()*2).toFixed(1),
        updatedAt: `${Math.max(1, Math.floor(Math.random()*10))} days ago`
    }))

    return (
        <div className="max-w-screen pt-6 pb-12 px-4 md:pl-20 md:pr-6 overflow-y-scroll h-screen">
            <AccountOverview user={user} />
            <AccountHighlight/>
            <AccountContent activeTab={activeTab} setActiveTab={setActiveTab} samplePosts={samplePosts}/>
        </div>
    )
}