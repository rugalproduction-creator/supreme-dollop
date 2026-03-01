import { createSignal, createMemo } from "solid-js";
import SearchBar from "#ui/SearchBar";
import ComicGrid from "#ui/ComicGrid.jsx";

export default function Search(){
    const [searchQuery, setSearchQuery] = createSignal('');
    const [sortBy, setSortBy] = createSignal('newest');

    const allComics = [
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
            name: 'Attack on Titan',
            author: 'Hajime Isayama',
            views: 985000,
            likes: 38100,
            episodes: 240,
            rating: 4.6,
            updatedAt: '1 week ago'
        },
        {
            id: 3,
            cover: '/supreme-dollop/jjk.jpg',
            name: 'One Piece',
            author: 'Eiichiro Oda',
            views: 720000,
            likes: 28900,
            episodes: 230,
            rating: 4.5,
            updatedAt: '3 weeks ago'
        },
        {
            id: 4,
            cover: '/supreme-dollop/jjk.jpg',
            name: 'Death Note',
            author: 'Tsugumi Ohba',
            views: 510000,
            likes: 19800,
            episodes: 220,
            rating: 4.4,
            updatedAt: '1 month ago'
        },
        {
            id: 5,
            cover: '/supreme-dollop/jjk.jpg',
            name: 'Demon Slayer',
            author: 'Koyoharu Gotouge',
            views: 310000,
            likes: 12000,
            episodes: 210,
            rating: 4.3,
            updatedAt: '2 months ago'
        },
    ];

    const filteredAndSortedComics = createMemo(() => {
        let results = allComics;

        // Filter by search query
        if (searchQuery()) {
            const query = searchQuery().toLowerCase();
            results = results.filter(comic => 
                comic.name.toLowerCase().includes(query) || 
                comic.author.toLowerCase().includes(query)
            );
        }

        // Sort results
        const sorted = [...results];
        const sort = sortBy();
        if (sort === 'newest') {
            sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        } else if (sort === 'oldest') {
            sorted.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        } else if (sort === 'a-z') {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'popularity') {
            sorted.sort((a, b) => b.views - a.views);
        } else if (sort === 'longest') {
            sorted.sort((a, b) => b.episodes - a.episodes);
        }

        return sorted;
    });

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const handleSortChange = (sort) => {
        setSortBy(sort);
    };

    return(
        <div className="w-screen h-screen overflow-y-scroll">
            <div className="md:pl-20 px-6 py-6 flex items-center justify-center">
                <SearchBar onSearchChange={handleSearchChange} onSortChange={handleSortChange}/>
            </div>
            <ComicGrid comics={filteredAndSortedComics()}/>
        </div>
    )
}