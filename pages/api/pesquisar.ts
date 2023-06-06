import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";

const sortByRating = (data: Record<string, any>[]) => {
    return data.sort((a, b) => b.rating - a.rating);
};

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        const { q: query } = req.query;
        
        if (typeof query !== 'string') {
            throw new Error("Pesquisa inválida!")
        }

        const games: {[key: string]: any} = {lancamentos: prismadb.lancamentos, emBreve: prismadb.emBreve, indie: prismadb.indie, categorias: prismadb.categorias, multiplayer: prismadb.multiPlayer, nintendo: prismadb.nintendo, pc: prismadb.pC, playstation: prismadb.playstation, singleplayer: prismadb.singlePlayer, xbox: prismadb.xbox}
       
        let searchGames: any[] = [];

        for (const game of Object.keys(games)) {
        const searchResults = await games[game].findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        rating: {
                            startsWith: query
                        }
                    },
                    {
                        publisher: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        genre: {
                            contains: query.replace(/,/g, " "),
                            mode: 'insensitive'
                        }
                    }
                ]
            }
          })

          if (searchResults !== null) {
            searchGames = [...searchGames, ...searchResults];
          }
        }

        const gamesIds = new Set();
        const uniqueSearchGames = searchGames.filter((game) => {
          if (gamesIds.has(game.id)) {
            return false;
          }
          gamesIds.add(game.id);
          return true;
        });

        const sortedGames = sortByRating(uniqueSearchGames);

        return res.status(200).json(sortedGames);
    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}