import axios from "axios"
import React, {useCallback, useMemo, useState} from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorite";

import { AiFillHeart } from "react-icons/ai";

interface FavoriteButtonProps {
    gameId: string,
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({gameId}) => {
    const {mutate: mutateFavorites} = useFavorites();
    const {data: currentUser, mutate} = useCurrentUser();
    const [isAnimating, setIsAnimating] = useState(false);

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        
        return list.includes(gameId);
    }, [currentUser, gameId]);

    const toggleFavorites = useCallback(async () => {
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

        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 2000);
    }, [gameId, isFavorite, currentUser, mutate, mutateFavorites])

    const iconClassName = isFavorite ? "heart-icon active" : "heart-icon";

    return (
        <div onClick={toggleFavorites} className="text-white font-bold relative bottom-5">
            <AiFillHeart className={`${iconClassName} ${isAnimating ? "pulse-animation" : ""}`} size={30} />
        </div>
    )
}

export default FavoriteButton;