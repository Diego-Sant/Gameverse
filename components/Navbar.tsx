import Image from "next/image";

import { useState } from "react";

import { useRouter } from "next/router";

import {BsSearch} from "react-icons/bs";

const Navbar  = () => {
    const router = useRouter();

    const [isClicked, setIsClicked] = useState(false);
    const [loadingBar, setloadingBar] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setloadingBar(true);
    };

    const handleBlur = () => {
        setIsClicked(false);
        setloadingBar(false);
    }

    const imageStyle = {
        width: 'auto',
        height: 'auto',
    };

    return (
        <nav className="w-full">
            <div className="px-4 md:px-16 py-3 flex sm:flex-row flex-col items-center duration-500" >
                <Image src="/images/gamelogosite.png" onClick={() => router.push('/')} className="cursor-pointer duration-500 hover:scale-105" alt="Gameverse" width={140} height={140} priority={true} style={imageStyle} />
                <div className="sm:ml-auto">
                    <div className="flex flex-row items-center gap-4 relative sm:mt-0 mt-10">
                        
                        <div className="flex cursor-pointer text-white items-center justify-center w-7 h-7 hover:bg-purple-500 hover:duration-500 hover:rounded-full">
                            <BsSearch className="w-4 h-4" />
                        </div>

                        <div className="h-6" style={{ border: '1px solid white' }}></div>

                        <div className="flex flex-col" onFocus={handleClick} onBlur={handleBlur}>
                            <input type="text" placeholder="Procure pelo jogo..." className={`bg-transparent text-white outline-none ${isClicked ? 'clicked' : ''}`} />
                            {loadingBar && <div className="loading-bar" />}
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;