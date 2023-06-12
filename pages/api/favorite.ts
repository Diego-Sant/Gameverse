import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === "POST") {
            const {currentUser} = await serverAuth(req, res);

            const {gameId} = req.body;

            const games: {[key: string]: any} = {lancamentos: prismadb.lancamentos, emBreve: prismadb.emBreve, indie: prismadb.indie, escolhas: prismadb.escolhas, luta: prismadb.luta, mundoaberto: prismadb.mundoAberto, rpg: prismadb.rPG, terror: prismadb.terror, estrategia: prismadb.estrategia, pixel: prismadb.pixel, multiplayer: prismadb.multiPlayer, nintendo: prismadb.nintendo, pc: prismadb.pC, playstation: prismadb.playstation, singleplayer: prismadb.singlePlayer, xbox: prismadb.xbox}
            
            let existingGame = null;

            for (const game of Object.keys(games)) {
                const gameOfType = await games[game].findUnique({
                    where: {
                        id: gameId,
                    },
                });

                if (gameOfType !== null) {
                    existingGame = gameOfType;
                    break;
                }
            }

            if (!existingGame) {
                throw new Error("ID inválido!")
            }

            const isGameInFavorites = currentUser.favoriteIds.includes(gameId);

            if (isGameInFavorites) {
                const updatedFavoriteIds = currentUser.favoriteIds.filter((id: string) => id !== gameId);
        
                await prismadb.user.update({
                  where: {
                    email: currentUser.email || "",
                  },
                  data: {
                    favoriteIds: updatedFavoriteIds,
                  },
                });
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || ""
                },
                data: {
                    favoriteIds: {
                        push: gameId
                    }
                },
            });

            return res.status(200).json(user);
        }
        if (req.method === "DELETE") {
            const { currentUser } = await serverAuth(req, res);
      
            const { gameId } = req.query as { gameId: string };
      
            const games: {[key: string]: any} = {lancamentos: prismadb.lancamentos, emBreve: prismadb.emBreve, indie: prismadb.indie, escolhas: prismadb.escolhas, luta: prismadb.luta, mundoaberto: prismadb.mundoAberto, rpg: prismadb.rPG, terror: prismadb.terror, estrategia: prismadb.estrategia, pixel: prismadb.pixel, multiplayer: prismadb.multiPlayer, nintendo: prismadb.nintendo, pc: prismadb.pC, playstation: prismadb.playstation, singleplayer: prismadb.singlePlayer, xbox: prismadb.xbox}
            
            let existingGame = null;

            for (const game of Object.keys(games)) {
                const gameOfType = await games[game].findUnique({
                    where: {
                        id: gameId,
                    },
                });

                if (gameOfType !== null) {
                    existingGame = gameOfType;
                    break;
                }
            }
      
            if (!existingGame) {
              throw new Error("ID inválido!");
            }
      
            const updatedFavoriteIds = without(currentUser.favoriteIds, gameId);
      
            const updatedUser = await prismadb.user.update({
              where: {
                email: currentUser.email || "",
              },
              data: {
                favoriteIds: updatedFavoriteIds,
              },
            });
      
            return res.status(200).json(updatedUser);
          }

          return res.status(405).end();
        } catch (error) {
          console.log(error);
      
          return res.status(500).end();
        }
      }