import GameCard from "@/components/GameCard";
import Navbar from "@/components/Navbar";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

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

  return (
    <>
      <Navbar />
      <div> 
        <GameCard />
      </div>
    </>
  )
}