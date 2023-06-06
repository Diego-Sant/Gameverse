import axios from "axios"
import React, {useCallback, useMemo, useState} from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

import { BsFillHeartbreakFill } from "react-icons/bs";

import useDislike from "@/hooks/useDislike";
import useFavorites from "@/hooks/useFavorite";

interface DislikeButtonProps {
    gameId: string
}

const DislikeButton: React.FC<DislikeButtonProps> = ({gameId}) => {
    const {mutate: mutateDislikes} = useDislike();
    const { mutate: mutateFavorites } = useFavorites();
    const {data: currentUser, mutate} = useCurrentUser();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDisliked, setIsDisliked] = useState(
        useMemo(() => {
          const list = currentUser?.dislikedIds || [];
          return list.includes(gameId);
        }, [currentUser, gameId])
    );

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(gameId);
      }, [currentUser, gameId]);

    const toggleDislike = useCallback(async () => {
        setIsDisliked((prevIsDisliked: any) => !prevIsDisliked);
        
        let response;

        if(isDisliked) {
            response = await axios.delete(`/api/dislike?gameId=${gameId}`);
        } else {
            response = await axios.post("/api/dislike", {gameId});
        }

        const updateddislikeIds = response?.data?.dislikedIds;

        mutate({
            ...currentUser,
            dislikedIds: updateddislikeIds
        });

        mutateDislikes();

        if (isFavorite) {
            const favoriteResponse = await axios.delete(`/api/favorite?gameId=${gameId}`);
            const updatedFavorites = favoriteResponse?.data?.favoriteIds;
            mutateFavorites({
              ...currentUser,
              favoriteIds: updatedFavorites,
            });
        }

        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 2000);
    }, [gameId, isDisliked, currentUser, mutate, mutateDislikes, isFavorite, mutateFavorites ])

    const iconClassName = isDisliked ? "dislike-icon active" : "heart-icon";

    return (
        <div onClick={toggleDislike}  className={`text-white font-bold relative bottom-5`}>
            <BsFillHeartbreakFill title="Não gostei" className={`${iconClassName} ${isAnimating ? "pulse-animation" : ""}`} size={25} />
        </div>
    )
}

export default DislikeButton;