import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const GameCard = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCategoryClick = (categoryPath: any) => {
        setIsLoading(true);
        router.push(categoryPath);
    };

    useEffect(() => {
        const handleRouteChange = () => {
          setIsLoading(false);
        };
    
        router.events.on("beforeHistoryChange", handleRouteChange);
    
        return () => {
          router.events.off("beforeHistoryChange", handleRouteChange);
        };
    }, [router.events]);

    const LoadingScreen = () => {
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="lds-heart"><div></div></div>
          </div>
        );
    };
    
    return (
        <div className="relative top-10 px-5 md:px-14 xl:px-16 2xl:px-24 space-y-8 px1grid">
                <div className="grid gridcols1min grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-2 xl1grid">
                    
                    <div onClick={() => handleCategoryClick('/generos/favoritos')} className="box flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Favoritos</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/lancamentos')} className="box2 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Lançamentos</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/umjogador')} className="box3 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Um jogador</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/coopmulti')} className="box4 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Co-op e Online</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/playstation')} className="box5 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Playstation</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/xbox')} className="box6 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Xbox</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/nintendo')} className="box7 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Nintendo</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/pcgames')} className="box8 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Jogos para PC</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/indie')} className="box9 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Jogos Indie</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/categorias')} className="box10 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Categorias</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/querojogar')} className="box11 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Quero jogar</p>
                    </div>

                    <div onClick={() => handleCategoryClick('/generos/naogostei')} className="box12 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Jogos que não gostei</p>
                    </div>

                    {isLoading && <LoadingScreen />}

                </div>
        </div>
    )
}

export default GameCard;