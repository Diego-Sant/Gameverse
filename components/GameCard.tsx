import React, { useState } from "react";
import { useRouter } from "next/router";

const GameCard = () => {
    const router = useRouter();
    
    return (
        <div className="relative top-10 px-5 md:px-14 xl:px-16 2xl:px-24 space-y-8 px1grid">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-2 xl1grid">
                    
                    <div className="box flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Favoritos</p>
                    </div>

                    <div onClick={() => router.push('/generos/lancamentos')} className="box2 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Lançamentos</p>
                    </div>

                    <div className="box3 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Um jogador</p>
                    </div>

                    <div className="box4 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Multi jogador</p>
                    </div>

                    <div className="box5 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Playstation</p>
                    </div>

                    <div className="box6 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Xbox</p>
                    </div>

                    <div className="box7 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Nintendo</p>
                    </div>

                    <div className="box8 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Jogos para PC</p>
                    </div>

                    <div className="box9 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Jogos Indie</p>
                    </div>

                    <div className="box10 flex cursor-pointer items-center justify-center relative mt-2 lg:mb-4 h-[150px] w-[210px] xl:h-[180px] xl:w-[270px] 2xl:h-[220px] 2xl:w-[300px]">
                        <span></span>
                        <span></span>
                        <p className="text-white text-lg md:text-2xl font-bold">Categorias</p>
                    </div>

                </div>
        </div>
    )
}

export default GameCard;