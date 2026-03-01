import { createSignal, createResource, createEffect  } from "solid-js";
import { useSearchParams } from '@solidjs/router'
import SearchBar from "#ui/SearchBar";
import { fetchGenres, fetchResults } from "#utils/actions.js";
import ComicGrid from "#ui/ComicGrid.jsx";

export default function Search(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = createSignal(searchParams.q ?? '')
    let debounceTimer;

    const [genres] = createResource(fetchGenres);

    const selectedGenres = () => {
        const g = searchParams.genres
        if (!g) return []
        return Array.isArray(g) ? g : [g]
    }

    const toggleGenre = (genre) => {
        const current = selectedGenres()
        const updated = current.includes(genre) ? current.filter(g => g !== genre) : [...current, genre]
        setSearchParams({ genres: updated.length ? updated : undefined })
    }
    
    const handleInput = (e) => {
        const val = e.target.value
        setInputValue(val)
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            setSearchParams({ q: val || undefined })
        }, 400)
    }

    const sortBy = () => searchParams.sort_by ?? 'created_at'
    const sortOrder = () => searchParams.sort_order ?? 'desc'

    const setSort = (by) => {
        if (sortBy() === by) {
            setSearchParams({ sort_order: sortOrder() === 'desc' ? 'asc' : 'desc' })
        } else {
            setSearchParams({ sort_by: by, sort_order: 'desc' })
        }
    }

    const [results, { refetch }] = createResource(() => ({
        q: searchParams.q,
        genres: selectedGenres(),
        sort_by: sortBy(),
        sort_order: sortOrder()
    }), fetchResults);

    createEffect(() => console.log(results()))
    return(
        <div className="w-screen h-screen overflow-y-scroll">
            <div className="md:pl-20 px-6 py-6 flex items-center justify-center">
                <SearchBar handleInput={handleInput} inputValue={inputValue()}/>
            </div>
            <ComicGrid comics={results() ?? []}/>
        </div>
    )
}