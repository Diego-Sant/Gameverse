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
  const {data: playstation = []} = useDataList("/api/playstation");
  const { isOpen, closeModal } = useInfoModal();

  const sortByRating = (data: Record<string, any>[]) => {
    return data.sort((a, b) => b.rating - a.rating);
  };

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div> 
        <GameList title="Exclusivos PlayStation" data={sortByRating(playstation)} />
      </div>
    </>
  )
}
