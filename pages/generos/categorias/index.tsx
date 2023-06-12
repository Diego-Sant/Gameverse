import Navbar from "@/components/Navbar";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useDataList from "@/hooks/useDataList";
import GameList from "@/components/GameList";
import useInfoModal from "@/hooks/useInfoModal";
import InfoModal from "@/components/InfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const {data: escolhas = []} = useDataList("/api/escolhas");
  const {data: estrategia = []} = useDataList("/api/estrategia");
  const {data: luta = []} = useDataList("/api/luta");
  const {data: mundoaberto = []} = useDataList("/api/mundoaberto");
  const {data: rpg = []} = useDataList("/api/rpg");
  const {data: terror = []} = useDataList("/api/terror");
  const {data: corrida = []} = useDataList("/api/corrida");
  const {data: pixel = []} = useDataList("/api/pixel");
  const { isOpen, closeModal } = useInfoModal();

  const sortByRating = (data: Record<string, any>[]) => {
    return data.sort((a, b) => b.rating - a.rating);
  };

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div> 
        <GameList title="Jogos de escolhas" data={sortByRating(escolhas)} />
        <GameList title="Jogos de estratégia" data={sortByRating(estrategia)} />
        <GameList title="Jogos de luta" data={sortByRating(luta)} />
        <GameList title="Jogos de mundo aberto" data={sortByRating(mundoaberto)} />
        <GameList title="Jogos de RPG" data={sortByRating(rpg)} />
        <GameList title="Jogos de terror" data={sortByRating(terror)} />
        <GameList title="Jogos de corrida" data={sortByRating(corrida)} />
        <GameList title="Jogos pixelados" data={sortByRating(pixel)} />
      </div>
    </>
  )
}
