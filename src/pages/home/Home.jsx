import { createAsync } from "@solidjs/router";
import { createSignal } from "solid-js";
import FilterBar from "./FilterBar";
import Jumbotron from "./Jumbotron";
import { contentLoader } from "#utils/loaders.js";
import FilterButton from "#ui/FilterButton.jsx";
import ComicGrid from "#ui/ComicGrid.jsx";

export default function Home(){
    const content = createAsync(() => contentLoader());
    const contentData = () => content() || [];

    return(
        <div className="w-screen h-screen overflow-y-scroll">
            <Jumbotron content={contentData()}/>
            <FilterBar/>
            <FilterButton/>
            <ComicGrid comics={contentData()}/>
        </div>
    )
}