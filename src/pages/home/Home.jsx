import { createAsync } from "@solidjs/router";
import { createSignal } from "solid-js";
import FilterBar from "./FilterBar";
import Jumbotron from "./Jumbotron";
import { contentLoader } from "#utils/loaders.js";
import FilterButton from "#ui/FilterButton.jsx";
import ComicGrid from "#ui/ComicGrid.jsx";

export default function Home(){
    const content = createAsync(() => contentLoader());
    const [comics, setComics] = createSignal([
        {
            id: 1,
            cover: '/supreme-dollop/jjk.jpg',
            name: 'Jujutsu Kaisen',
            author: 'Gege Akutami',
            views: 1245000,
            likes: 45200,
            episodes: 247,
            rating: 4.7,
            updatedAt: '2 days ago'
        },
        {
            id: 2,
            cover: '/supreme-dollop/jjk.jpg',
            name: 'Jujutsu Kaisen',
            author: 'Gege Akutami',
            views: 985000,
            likes: 38100,
            episodes: 240,
            rating: 4.6,
            updatedAt: '1 week ago'
        },
        {
            id: 3,
            cover: '/supreme-dollop/jjk.jpg',
            name: 'Jujutsu Kaisen',
            author: 'Gege Akutami',
            views: 720000,
            likes: 28900,
            episodes: 230,
            rating: 4.5,
            updatedAt: '3 weeks ago'
        },
        {
            id: 4,
            cover: '/supreme-dollop/jjk.jpg',
            name: 'Jujutsu Kaisen',
            author: 'Gege Akutami',
            views: 510000,
            likes: 19800,
            episodes: 220,
            rating: 4.4,
            updatedAt: '1 month ago'
        },
        {
            id: 5,
            cover: '/supreme-dollop/jjk.jpg',
            name: 'Jujutsu Kaisen',
            author: 'Gege Akutami',
            views: 310000,
            likes: 12000,
            episodes: 210,
            rating: 4.3,
            updatedAt: '2 months ago'
        },
    ])

    return(
        <div className="w-screen h-screen overflow-y-scroll">
            <Jumbotron content={content}/>
            <FilterBar/>
            <FilterButton/>
            <ComicGrid comics={comics()}/>
        </div>
    )
}