import { useRouter } from "next/router";
import { useState } from "react";
import { BsSearch } from "react-icons/bs"

const SearchInput = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [loadingBar, setloadingBar] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleClick = () => {
        setIsClicked(true);
        setloadingBar(true);
    };

    const handleBlur = () => {
        setIsClicked(false);
        setloadingBar(false);
    }

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`/pesquisar?q=${encodedSearchQuery}`)
    };

    const handleIconClick = (e: React.MouseEvent) => {
        e.preventDefault();
    
        if (searchQuery.trim() !== "") {
          onSearch(e);
        }

        if (searchQuery.trim() === "") {
            onSearch(e);
        }
    };

    return (
        <form className="flex gap-3" onSubmit={onSearch}>
            <div onClick={handleIconClick} className="flex iconmin cursor-pointer text-white items-center justify-center w-7 h-7 hover:bg-purple-500 hover:duration-500 hover:rounded-full">
                <BsSearch  className="w-4 h-4" />
            </div>

            <div className="h-6" style={{ border: '1px solid white' }}></div>

            <div className="flex flex-col" onFocus={handleClick} onBlur={handleBlur}>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Pesquise jogos, distribuidora, gênero ou youtuber" className={`bg-transparent text-white w-[22rem] outline-none ${isClicked ? 'clicked' : ''}`} />
                {loadingBar && <div className="loading-bar" />}
            </div>
        </form>
    )
}

export default SearchInput;