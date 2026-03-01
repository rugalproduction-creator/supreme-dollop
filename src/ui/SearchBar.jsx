import { createSignal } from 'solid-js';
import Input from '#ui/Input';
import { SearchIcon, ArrowUpDown, X } from 'lucide-solid';

export default function SearchBar(props){
    const [searchQuery, setSearchQuery] = createSignal('');
    const [sortBy, setSortBy] = createSignal('newest');
    const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);
    const [isMobileModalOpen, setIsMobileModalOpen] = createSignal(false);

    const sortOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'a-z', label: 'A-Z' },
        { value: 'popularity', label: 'Popularity' },
        { value: 'longest', label: 'Longest' },
    ];

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        if (props.onSearchChange) {
            props.onSearchChange(query);
        }
    };

    const handleSortSelect = (value) => {
        setSortBy(value);
        setIsDropdownOpen(false);
        setIsMobileModalOpen(false);
        if (props.onSortChange) {
            props.onSortChange(value);
        }
    };

    return(
        <>
                <div className="w-full max-w-4xl flex gap-4 items-end">
                    {/* Search Bar */}
                    <div className="flex-1">
                        <Input 
                            id="search-input"
                            type="text"
                            name="search"
                            label="Search..."
                            icon={SearchIcon}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Sort Button - Desktop */}
                    <div className="relative hidden sm:block">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen())}
                            className="cursor-pointer flex items-center gap-2 border border-solid text-white-300 border-white-100 rounded-md px-4 py-2.5 my-2 hover:bg-prussian-blue-500 active:bg-prussian-blue-500 transition-colors"
                        >
                            <ArrowUpDown size={20}/>
                            <span className="text-sm">{sortOptions.find(opt => opt.value === sortBy())?.label}</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen() && (
                            <div className="absolute right-0 top-full mt-1 bg-white-100/60 border border-solid border-white-100 rounded-md shadow-lg z-10 min-w-40">
                                {sortOptions.map(option => (
                                        <button
                                            onClick={() => handleSortSelect(option.value)}
                                            className={`cursor-pointer block w-full text-left px-4 py-2.5 hover:bg-prussian-blue-500 active:bg-prussian-blue-500 transition-colors first:rounded-t-md last:rounded-b-md ${
                                                sortBy() === option.value ? 'bg-prussian-blue-600 text-white-500 font-semibold' : ''
                                            }`}
                                        >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sort Button - Mobile Icon */}
                    <button
                        onClick={() => setIsMobileModalOpen(true)}
                        className="sm:hidden border border-solid border-prussian-blue-500 rounded-md p-2.5 my-2 hover:bg-prussian-blue-500 active:bg-prussian-blue-500 transition-colors"
                    >
                        <ArrowUpDown size={20} />
                    </button>
                </div>

            {/* Mobile Popup - Centered */}
            {isMobileModalOpen() && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
                        onClick={() => setIsMobileModalOpen(false)}
                    />
                    
                    {/* Centered Popup */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 sm:hidden px-4">
                        <div className="bg-gray-900 rounded-xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in-95 duration-200">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white-100">
                                <h3 className="text-lg font-semibold">Sort By</h3>
                                <button
                                    onClick={() => setIsMobileModalOpen(false)}
                                    className="p-1 hover:bg-white-50 active:bg-white-50 rounded-md transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Options */}
                            <div className="max-h-80 overflow-y-auto">
                                {sortOptions.map((option, index) => (
                                        <button
                                            onClick={() => handleSortSelect(option.value)}
                                            className={`w-full px-6 py-4 flex items-center gap-3 transition-colors ${
                                                sortBy() === option.value 
                                                    ? 'bg-white-100' 
                                                    : 'hover:bg-white-50 active:bg-white-50'
                                            } ${index !== sortOptions.length - 1 ? 'border-b border-white-100' : ''}`}
                                        >
                                        <span className={sortBy() === option.value ? 'font-semibold text-blue-500' : ''}>
                                            {option.label}
                                        </span>
                                        {sortBy() === option.value && (
                                            <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}