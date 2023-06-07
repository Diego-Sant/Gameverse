import axios from "axios"
import React, {useCallback, useMemo, useState} from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorite";

import { BsFillHeartFill } from "react-icons/bs";
import useDislike from "@/hooks/useDislike";

interface FavoriteButtonProps {
    gameId: string,
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ gameId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { mutate: mutateDislikes } = useDislike();
    const {data: currentUser, mutate} = useCurrentUser();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isFavorite, setIsFavorite] = useState(useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(gameId);
      }, [currentUser, gameId])
    );

    const isDisliked = useMemo(() => {
        const list = currentUser?.dislikedIds || [];

        return list.includes(gameId);
    }, [currentUser, gameId]);

    const toggleFavorites = useCallback(async () => {
        setIsFavorite((prevIsFavorite: any) => !prevIsFavorite);
        
        let response;

        if(isFavorite) {
            response = await axios.delete(`/api/favorite?gameId=${gameId}`);
        } else {
            response = await axios.post("/api/favorite", {gameId});
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });

        mutateFavorites();

        if (isDisliked) {
            const dislikeResponse = await axios.delete(`/api/dislike?gameId=${gameId}`);
            const updatedDislikedIds = dislikeResponse?.data?.dislikedIds;
            mutateDislikes({
              ...currentUser,
              dislikedIds: updatedDislikedIds,
            });
        }

        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 2000);
    }, [gameId, isFavorite, currentUser, mutate, mutateFavorites, isDisliked, mutateDislikes])

    const iconClassName = isFavorite ? "heart-icon active" : "heart-icon";

    return (
        <div onClick={toggleFavorites} className={`text-white font-bold relative bottom-5`}>
            <BsFillHeartFill title="Gostei" className={`${iconClassName} ${isAnimating ? "pulse-animation" : ""}`} size={25} />
        </div>
    )
}

export default FavoriteButton;