import { createSignal, createMemo } from 'solid-js';
import { TrendingUp, Flame, Sparkles, Dices, Clock } from 'lucide-solid';

export default function FilterBar() {
  const [activeFilter, setActiveFilter] = createSignal('trending');
  const [windowWidth, setWindowWidth] = createSignal(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Responsive icon size
  const iconSize = createMemo(() => {
    const width = windowWidth();
    if (width < 640) return 40;
    if (width < 1024) return 48;
    return 56;
  });

  // Responsive padding
  const getPadding = createMemo(() => {
    const width = windowWidth();
    if (width < 640) return 'p-3';
    if (width < 1024) return 'p-4';
    return 'p-5';
  });

  // Responsive gap
  const getGap = createMemo(() => {
    const width = windowWidth();
    if (width < 640) return 'gap-3';
    if (width < 1024) return 'gap-4';
    return 'gap-6';
  });

  // Handle window resize
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
  }

  const filters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'popular', label: 'Popular', icon: Flame },
    { id: 'newest', label: 'Newest', icon: Clock },
    { id: 'personalized', label: 'Personalized', icon: Sparkles },
    { id: 'random', label: 'Random', icon: Dices },
  ];

  return (
    <div class="w-full py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 border-b border-solid border-white-200">
      <div class="max-w-6xl mx-auto">
        <div class={`flex flex-wrap justify-center ${getGap()}`}>
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            const isActive = activeFilter() === filter.id;

            return (
              <button
                onClick={() => setActiveFilter(filter.id)}
                class={`flex flex-col items-center gap-2 sm:gap-2.5 transition-all duration-300 group cursor-pointer`}
              >
                <div
                  class={`${getPadding()} rounded-lg sm:rounded-xl lg:rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-orange-500 shadow-2xl scale-110 shadow-orange-500/50 hover:bg-prussian-blue-600 hover:shadow-xl hover:shadow-orange-500/50 active:bg-prussian-blue-600 active:shadow-xl active:shadow-orange-500/50'
                      : 'bg-prussian-blue-700 shadow-lg hover:bg-prussian-blue-600 hover:shadow-xl hover:shadow-orange-500/20 active:bg-prussian-blue-600 active:shadow-xl active:shadow-orange-500/20'
                  }`}
                >
                  <IconComponent
                    size={iconSize()}
                    class={`stroke-2 transition-colors duration-300 ${
                      isActive ? 'text-white group-hover:text-orange-500 group-active:text-orange-500' : 'text-alabaster-grey-500 group-hover:text-orange-500 group-active:text-orange-500'
                    }`}
                  />
                </div>
                <span
                  class={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                      isActive
                        ? 'text-orange-500 text-sm sm:text-base font-bold'
                        : 'text-alabaster-grey-500 group-hover:text-white group-active:text-white'
                  }`}
                >
                  {filter.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}