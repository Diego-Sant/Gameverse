import Navbar from "@/components/Navbar";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useFavorites from "@/hooks/useFavorite";
import GameList from "@/components/GameList";

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
  const {data: favorites = []} = useFavorites()

  return (
    <>
      <Navbar />
      <div> 
        <GameList title="Minha lista" data={favorites} />
      </div>
    </>
  )
}
