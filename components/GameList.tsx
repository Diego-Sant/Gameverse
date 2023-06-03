import React from "react";

import {isEmpty} from "lodash"

import GameGenresCard from "./GameGenresCard";

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const GameList: React.FC<MovieListProps> = ({data, title}) => {

    if (isEmpty(data)) {
        return null;
    }

    return (
        <div className="relative mt-4">
                <p className="text-white px-4 md:px-12 lg:px-20 xl:px-24 text-lg md:text-xl lg:text-2xl font-bold">{title}</p>
                <div>
                    {data.map((game) => (
                        <GameGenresCard key={game.id} data={game} />
                    ))}
                </div>
        </div>
    )
}

export default GameList;