import React, { useState } from "react";
import { useRouter } from "next/router";

interface GameCardProps {
    data: Record<string, any>;
}

const GameGenresCard: React.FC<GameCardProps> = ({data}) => {
    const router = useRouter();
    
    return (
        <div className="relative px-5 md:px-14 xl:px-16 2xl:px-24">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-3">
                <div className="flex cursor-pointer items-center justify-center relative mt-8 ">
                    {/* eslint-disable-next-line */}
                    <img className="" src={data?.secondThumbnailUrl} alt={data?.title}/>
                </div>
                <div className="flex cursor-pointer items-center justify-center relative mt-8 ">
                    {/* eslint-disable-next-line */}
                    <img className="" src={data?.secondThumbnailUrl} alt={data?.title}/>
                </div>
                <div className="flex cursor-pointer items-center justify-center relative mt-8 ">
                    {/* eslint-disable-next-line */}
                    <img className="" src={data?.secondThumbnailUrl} alt={data?.title}/>
                </div>
                <div className="flex cursor-pointer items-center justify-center relative mt-8 ">
                    {/* eslint-disable-next-line */}
                    <img className="" src={data?.secondThumbnailUrl} alt={data?.title}/>
                </div>
                <div className="flex cursor-pointer items-center justify-center relative mt-8 ">
                    {/* eslint-disable-next-line */}
                    <img className="" src={data?.secondThumbnailUrl} alt={data?.title}/>
                </div>
                <div className="flex cursor-pointer items-center justify-center relative mt-8 ">
                    {/* eslint-disable-next-line */}
                    <img className="" src={data?.secondThumbnailUrl} alt={data?.title}/>
                </div>
            </div>
        </div>
    )
}

export default GameGenresCard;