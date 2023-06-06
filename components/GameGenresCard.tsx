import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

import {AiFillStar} from "react-icons/ai";
import {FaForward, FaVolumeMute, FaVolumeUp, FaBackward} from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";

import FavoriteButton from "./FavoriteButton";
import DislikeButton from "./DislikeButton";
import WannaPlayButton from "./WannaPlayButton";
import useInfoModal from "@/hooks/useInfoModal";

interface GameCardProps {
    data: Record<string, any>;
}

const GameGenresCard: React.FC<GameCardProps> = ({data}) => {
    const router = useRouter();
    const {openModal} = useInfoModal();
    const playerRef = useRef<ReactPlayer | null>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [isAutoplay, setIsAutoplay] = useState(false);
    const [muted, setMuted] = useState(true);

    const handleToggleMute = () => {
        setMuted((prevMuted) => !prevMuted);
    };
    
    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsAutoplay(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsAutoplay(false);
        setMuted(true);
    };

    const handleSkip5Seconds = () => {
        const player = playerRef.current;

        if (player) {
          const currentPosition = player.getCurrentTime();
          const newPosition = currentPosition + 5;
      
          player.seekTo(newPosition);
        }
    };

    const handleBack5Seconds = () => {
        const player = playerRef.current;
      
        if (player) {
          const currentPosition = player.getCurrentTime();
          const newPosition = currentPosition - 5;

          player.seekTo(newPosition);
        }
    };

    return (
        <div className="group relative px-5 md:px-14" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="flex cursor-pointer items-center justify-center relative mt-8 mb-5 lg:mb-10" >

                    {data?.rating ? 
                        <div className="flex flex-row items-center absolute left-2 bottom-2 bg-[#450df2] rounded-lg py-1 px-2">
                            <AiFillStar className=" text-[#f5c518] mr-1" />
                            <p className="text-white  text-sm font-semibold">{data?.rating}/10</p>
                        </div> 
                    : ""}
                    {/* eslint-disable-next-line */}
                    {data.ageRatingUrl ? <img src={data.ageRatingUrl} className="w-6 h-6 absolute bottom-2 right-2" alt="Classificação do Conteúdo"/> : ""}
                    {/* eslint-disable-next-line */}
                    <img className="rounded-lg cursor-pointer transition duration shadow-xl group-hover:opacity-90 sm:group-hover:opacity-0 delay-300" src={data.thumbnailUrl} alt={data.title}/>
                    <div className="opacity-0 absolute object-cover w-full h-full group-hover:opacity-100">
                    <ReactPlayer ref={playerRef} className="w-full object-cover cursor-pointer" style={{ pointerEvents: "none" }} url={data.videoUrl} playing={isHovered && isAutoplay} loop muted={muted} controls={false} width="100%" height="100%" config={{
                            youtube: {
                                playerVars: {
                                    disablekb: 1,
                                    modestbranding: 1,
                                    rel: 0,
                                    fs: 0,
                                }
                            }
                    }} />

                        {data.videoUrl && (

                        <>
                            <div onClick={handleBack5Seconds} className="cursor-pointer skipsmall w-8 h-8 lg:w-10 lg:h-10 bg-[#450df2] border-white border-2 rounded-full flex justify-center items-center transition hover:bg-purple-400 absolute bottom-2 left-2">
                                <FaBackward className="text-white lg:text-[15px] text-[10px]" />
                            </div>
                            <div onClick={handleSkip5Seconds} className="cursor-pointer skipsmall w-8 h-8 lg:w-10 lg:h-10 bg-[#450df2] border-white border-2 rounded-full flex justify-center items-center transition hover:bg-purple-400 absolute bottom-2 left-12 lg:left-14">
                                <FaForward className="text-white lg:text-[15px] text-[10px]" />
                            </div>
                        </>

                        )}

                        {data.videoUrl && (
                            <div onClick={handleToggleMute} className="cursor-pointer mutesmall w-8 h-8 lg:w-10 lg:h-10 bg-[#450df2] border-white border-2 rounded-full flex justify-center items-center transition hover:bg-purple-400 absolute bottom-2 right-12 lg:right-14">
                                {muted ? 
                                    (<FaVolumeMute className="text-white lg:text-[15px] text-[10px]" />
                                        ) : (
                                    <FaVolumeUp className="text-white lg:text-[15px] text-[10px]" />
                                )}
                            </div>
                        )}

                        {data.videoUrl && (
                            <div onClick={() => openModal(data?.id)} className="cursor-pointer mutesmall w-8 h-8 lg:w-10 lg:h-10 bg-[#450df2] border-white border-2 rounded-full flex justify-center items-center transition hover:bg-purple-400 absolute bottom-2 right-2">
                                <BsChevronDown className="text-white lg:text-[15px] text-[10px]" />
                            </div>
                        )}
                    
                        <div className="flex flex-col items-center">
                            <div className="z-30 bg-[#450df2] p-2 lg:p-4 w-full transition shadow-md cursor-auto rounded-b-lg">
                                <div className="text-white font-bold text-sm sm:text-md lg:text-lg text-center">
                                    {data.title && data.title.length > 30 ? `${data.title.slice(0, 30)}...` : data.title}
                                </div>
                            </div>
                            <div className="p-2 z-50 w-full transition">
                                <div className="flex items-center justify-center gap-3">
                                    <DislikeButton gameId={data.id} />
                                    <WannaPlayButton gameId={data.id} />
                                    <FavoriteButton gameId={data.id} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
        </div>
    )
}

export default GameGenresCard;