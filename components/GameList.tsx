import React, { useEffect, useState } from "react";

import {isEmpty} from "lodash"

import GameGenresCard from "./GameGenresCard";

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const GameList: React.FC<MovieListProps> = ({data, title}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);
    
        return () => clearTimeout(loadingTimer);
    }, []);

    const LoadingScreen = () => {
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="lds-heart"><div></div></div>
          </div>
        );
    };

    return (
        <div className="relative mt-4">
                <p className="text-white px-4 md:px-12 lg:px-20 xl:px-14 text-lg md:text-xl lg:text-2xl font-bold">{title}</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4 lg:gap-3">
                    {data.map((game) => (
                        <GameGenresCard key={game.id} data={game} />
                    ))}
                </div>
                {isLoading && <LoadingScreen />}
        </div>

    )
}

export default GameList;