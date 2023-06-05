import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
      return res.status(405).end();
  }

  try {
      
      const {currentUser} = await serverAuth(req, res);

      const games: {[key: string]: any} = {lancamentos: prismadb.lancamentos, emBreve: prismadb.emBreve, indie: prismadb.indie, categorias: prismadb.categorias, multiplayer: prismadb.multiPlayer, nintendo: prismadb.nintendo, pc: prismadb.pC, playstation: prismadb.playstation, singleplayer: prismadb.singlePlayer, xbox: prismadb.xbox}

      let favoriteGames: any[] = [];

      for (const game of Object.keys(games)) {
        const gameOfType = await games[game].findMany({
          where: {
            id: {
              in: currentUser?.favoriteIds,
            },
          },
        });
      
        if (gameOfType !== null) {
          favoriteGames = [...favoriteGames, ...gameOfType];
        }
      }

      const gamesIds = new Set();
      const uniquefavoriteGames = favoriteGames.filter((game) => {
        if (gamesIds.has(game.id)) {
          return false; // Remove filmes duplicados
        }
        gamesIds.add(game.id);
        return true;
      })
      .sort((a: any, b: any) => {
        const orderA = currentUser.favoriteIds.indexOf(a.id);
        const orderB = currentUser.favoriteIds.indexOf(b.id);
        return orderA - orderB;
      })

      return res.status(200).json(uniquefavoriteGames);

  } catch (error) {
      console.log(error);
      return res.status(400).end();
  }
}