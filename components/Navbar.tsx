import Image from "next/image";

import { useRouter } from "next/router";

import SearchInput from "./SearchInput";

const Navbar  = () => {
    const router = useRouter();

    const imageStyle = {
        width: 'auto',
        height: 'auto',
    };

    return (
        <nav className="w-full">
            <div className="px-4 md:px-16 py-3 flex sm:flex-row flex-col items-center duration-500" >
                <Image src="/images/gamelogosite.png" onClick={() => router.push('/')} className="cursor-pointer duration-500 hover:scale-105" alt="Gameverse" width={140} height={140} priority={true} style={imageStyle} />
                <div className="sm:ml-auto">
                    <div className="flex flex-row top-[0.10rem] items-center gap-4 relative sm:mt-0 mt-10">
                        
                        <SearchInput />

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;