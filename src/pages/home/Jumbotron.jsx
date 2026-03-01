import { Show } from "solid-js";

export default function Jumbotron(props) {
  const imageUrl = () => props.content()?.[0]?.cover_url;
  console.log(props)

  return (
    <Show
      when={imageUrl()}
      fallback={
        <div class="w-full h-[60vh] bg-white-100 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <section class="relative w-full overflow-hidden 
                      h-[65vh] 
                      sm:h-[70vh] 
                      lg:h-[85vh]">

        {/* Background Image */}
        <img
          src={imageUrl()}
          alt="Featured Manga"
          loading="eager"
          class="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div class="absolute inset-0
                        bg-linear-to-r
                        from-black-500/95
                        via-alabaster-500/50
                        to-transparent" />

        {/* Content */}
        <div class="relative z-10 h-full 
                        max-w-7xl mx-auto 
                        px-6 flex flex-col 
                        justify-center text-white-400 md:pl-20 min-[1282px]:pl-0">

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-2xl">
            Discover Worlds Beyond Panels
          </h1>

          <p class="mt-4 max-w-xl text-lg text-white-300">
            Read, create, and publish your own manga and comics.
          </p>

          <div class="mt-6 flex gap-4">
            <button class="cursor-pointer bg-prussian-blue-400 text-white-500 px-6 py-3 rounded-xl font-semibold hover:bg-prussian-blue-600 transition">
              Explore
            </button>

            <button class="cursor-pointer border border-white-300 px-6 py-3 rounded-xl hover:bg-white-100 transition">
              Publish
            </button>
          </div>

        </div>
      </section>
    </Show>
  );
}