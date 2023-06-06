import axios from "axios"
import React, {useCallback, useMemo, useState} from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

import { GiConsoleController } from "react-icons/gi";

import useWannaPlay from "@/hooks/useWannaPlay";

interface WannaPlayButtonProps {
    gameId: string
}

const WannaPlayButton: React.FC<WannaPlayButtonProps> = ({gameId}) => {
    const {mutate: mutateWannaPlay} = useWannaPlay();
    const {data: currentUser, mutate} = useCurrentUser();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isWannaPlay, setIsWannaPlay] = useState(
        useMemo(() => {
          const list = currentUser?.wannaPlay || [];
          return list.includes(gameId);
        }, [currentUser, gameId])
    );

    const toggleWannaPlays = useCallback(async () => {
        setIsWannaPlay((prevIsWannaPlay: any) => !prevIsWannaPlay);
        
        let response;

        if(isWannaPlay) {
            response = await axios.delete(`/api/wannaplay?gameId=${gameId}`);
        } else {
            response = await axios.post("/api/wannaplay", {gameId});
        }

        const updateWannaPlay = response?.data?.wannaPlay;

        mutate({
            ...currentUser,
            wannaPlay: updateWannaPlay
        });

        mutateWannaPlay();

        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 2000);
    }, [gameId, isWannaPlay, currentUser, mutate, mutateWannaPlay])

    const iconClassName = isWannaPlay ? "wannaplay-icon active" : "heart-icon";

    return (
        <div onClick={toggleWannaPlays}  className={`text-white font-bold relative bottom-6`}>
            <GiConsoleController title="Quero jogar" className={`${iconClassName} ${isAnimating ? "pulse-animation" : ""}`} size={30} />
        </div>
    )
}

export default WannaPlayButton;