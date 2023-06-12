import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        await serverAuth(req, res);

        const {gameId} = req.query;

        if(typeof gameId !== 'string') {
            throw new Error("ID inválido!")
        }

        if(!gameId) {
            throw new Error("ID inválido!")
        }

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

        return res.status(200).json(existingGame);
    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}