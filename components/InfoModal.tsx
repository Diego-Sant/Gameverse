import React, {useCallback, useEffect, useRef, useState} from "react";

import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import ReactPlayer from "react-player";
import useGame from "@/hooks/useGame";

interface InfoModalProps {
    visible?: boolean,
    onClose: any,
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(!!visible);
    const [muted, setMuted] = useState(true);
    const playerRef = useRef<ReactPlayer | null>(null);

    const {gameId} = useInfoModal();
    const {data = {}} = useGame(gameId);

    const handleToggleMute = () => {
        setMuted((prevMuted) => !prevMuted);
    };

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible])

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);
    
    if(!visible) {
        return null;
    }

    return (
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 pb-10 relative flex-auto bg-[#141414] drop-shadow-md`}>
                    <div className="relative h-[30rem]">

                    <ReactPlayer ref={playerRef} className="w-full object-cover cursor-pointer" url={data.videoUrl} playing={true} loop muted={muted} controls={true} width="100%" height="100%" config={{
                            youtube: {
                                playerVars: {
                                    disablekb: 1,
                                    modestbranding: 1,
                                    rel: 0,
                                    fs: 1,
                                }
                            }
                    }} />

                        <div className="cursor-pointer absolute top-2 right-2 h-10 w-10 rounded-full hover:bg-opacity-50 bg-black bg-opacity-70 flex items-center justify-center" onClick={handleClose}>
                            <AiOutlineClose className="text-white" size={20} />
                        </div>
                    
                    </div>

                                                
                    <div className="flex flex-row z-50 relative ">
                        <div className="px-12 py-5 max-w-[600px]">
                        <p className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">{data?.title}</p>
                            {data?.rating ? <div className="flex flex-row items-center">
                                <AiFillStar className="mt-3 mr-2 text-[#f5c518]" />
                                <p className="text-white text-sm font-semibold mt-3">{data?.rating}/10</p> 
                            </div> : ""}
                            <div className="h-5 w-5 mt-3">
                                {/* eslint-disable-next-line */}
                                <img src={data.ageRatingUrl} alt="Classificação do Conteúdo"/>
                            </div>
                            {data?.duration || data?.rating || data?.ageRatingUrl ? <p className="text-white text-md mt-3">{data?.description}</p> : <p className="text-white text-md -mt-7">{data?.description}</p>}
                        </div>

                        <div>
                            <p className="text-white text-md pt-5 mr-2"><span className="text-gray-400">Gêneros:</span> {data.genre}</p>
                            <p className="text-white text-md pt-5 mr-2 flex flex-col"><span className="text-gray-400">Publicadora:</span> {data.publisher}</p>
                            <p className="text-white text-md pt-5 mr-2 flex flex-col"><span className="text-gray-400">Data de lançamento:</span> {data.released}</p>
                            {data?.timeToBeat ? <p className="text-white text-md pt-5 mr-2 flex flex-col"><span className="text-gray-400">Tempo para zerar:</span> {data?.timeToBeat}</p> : ""}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoModal;