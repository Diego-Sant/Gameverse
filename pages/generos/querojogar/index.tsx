import Navbar from "@/components/Navbar";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import GameList from "@/components/GameList";
import useWannaPlay from "@/hooks/useWannaPlay";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

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
  const {data: wannaPlay = []} = useWannaPlay();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
        <div> 
            <GameList title="Jogos que quero jogar" data={wannaPlay} />
        </div>
    </>
  )
}
